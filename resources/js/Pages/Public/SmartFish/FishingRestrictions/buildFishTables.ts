import { buildTableRows } from './buildTableRows'
import {
	normalizeApiRow,
	sortNormalizedRecords,
	toLegacyRestriction,
} from './FishingRestrictionsTransformers'
import type { NormalizedRecord } from './restrictionRecordTypes'
import type { FishTableViewModel } from './restrictionTableTypes'
import type { FishingRestriction } from './FishingRestrictionsTransformers'

export type BuildFishTablesOptions = {
	waterId?: number | null
}

export type BuildFishTablesResult = {
	fishTables: FishTableViewModel[]
	undatedExceptions: FishingRestriction[]
}

function hasSeasonDates(record: NormalizedRecord): boolean {
	return record.seasonStart !== null && record.seasonEnd !== null
}

function isValidSeason(record: NormalizedRecord): boolean {
	return (
		hasSeasonDates(record) &&
		record.seasonStart !== null &&
		record.seasonEnd !== null &&
		record.seasonStart.getTime() <= record.seasonEnd.getTime()
	)
}

function partitionRecords(records: NormalizedRecord[]) {
	const restrictions: NormalizedRecord[] = []
	const datedExceptions: NormalizedRecord[] = []
	const undatedExceptions: NormalizedRecord[] = []

	for (const record of records) {
		if (record.exceptionType != null) {
			if (isValidSeason(record)) {
				datedExceptions.push(record)
			} else {
				undatedExceptions.push(record)
			}
			continue
		}
		restrictions.push(record)
	}

	return { restrictions, datedExceptions, undatedExceptions }
}

function bucketByFish(records: NormalizedRecord[]): Map<string, NormalizedRecord[]> {
	const fish = new Map<string, NormalizedRecord[]>()

	for (const record of records) {
		const name = record.fishName
		const bucket = fish.get(name) ?? []
		bucket.push(record)
		fish.set(name, bucket)
	}

	return fish
}

export function buildFishTables(
	results: Record<string, unknown>[] | null | undefined,
	options: BuildFishTablesOptions = {},
): BuildFishTablesResult {
	if (!results?.length) {
		return { fishTables: [], undatedExceptions: [] }
	}

	const normalized = results.map(normalizeApiRow)
	const { restrictions, datedExceptions, undatedExceptions } = partitionRecords(normalized)
	const restrictionBuckets = bucketByFish(restrictions)
	const fishTables: FishTableViewModel[] = []

	const onWaterPage = options.waterId != null

	for (const [fishName, fishRestrictions] of restrictionBuckets) {
		if (!fishName) {
			continue
		}

		let records = sortNormalizedRecords(fishRestrictions)

		const fishId = fishRestrictions[0]?.fishId ?? null

		fishTables.push({
			fishName,
			rows: buildTableRows(records, {
				onWaterPage,
				overlapExceptions: datedExceptions,
				fishId,
			}),
		})
	}

	fishTables.sort((a, b) => a.fishName.localeCompare(b.fishName))

	return {
		fishTables,
		undatedExceptions: undatedExceptions.map(toLegacyRestriction),
	}
}

/** @deprecated Use buildFishTables */
export function byFish(results: Record<string, unknown>[] | null | undefined) {
	const { fishTables, undatedExceptions } = buildFishTables(results)
	const fish: Record<string, { restrictions: FishingRestriction[] }> = {}

	for (const table of fishTables) {
		fish[table.fishName] = { restrictions: [] }
	}

	if (undatedExceptions.length > 0) {
		fish[''] = { restrictions: undatedExceptions }
	}

	return Object.keys(fish).length > 0 ? fish : undefined
}

import parseMySqlDate from '@/Util/parseMySqlDate'
import { normalizeExportText } from '@/Util/normalizeExportText'
import { compareAsc } from 'date-fns'
import type { NormalizedRecord } from './restrictionRecordTypes'

function normalizeOptionalText(value: unknown): string {
	return normalizeExportText(value) ?? ''
}

export function formatFishingMethod(row: {
	method?: string | null
	fishing_method?: { name?: string | null } | null
}): string {
	const raw =
		(typeof row?.method === 'string' ? row.method : null) ?? row?.fishing_method?.name ?? ''

	if (!raw) {
		return ''
	}

	if (
		raw === 'fly fishing' ||
		raw === 'May only be angled by artificial fly or baited barbless hook with a single point'
	) {
		return 'Fly Fishing'
	}

	if (raw === 'angling') {
		return 'Angling'
	}

	if (raw === 'dip net') {
		return 'Dip Net'
	}

	return raw
}

export function normalizeApiRow(row: Record<string, unknown>): NormalizedRecord {
	const seasonStart = row.season_start ? parseMySqlDate(row.season_start as string) : null
	const seasonEnd = row.season_end ? parseMySqlDate(row.season_end as string) : null
	const fish = row.fish as { id?: number; name?: string } | null | undefined
	const water = row.water as { id?: number; name?: string } | null | undefined

	return {
		id: row.id as number,
		fishId: fish?.id ?? null,
		fishName: normalizeOptionalText(fish?.name),
		waterId: water?.id ?? (row.water_id as number | null) ?? null,
		isException: !!row.exception_type,
		seasonStart,
		seasonEnd,
		bagLimit: row.bag_limit as number | null,
		hookLimit: row.hook_release_limit as number | null,
		minSize: normalizeExportText(row.minimum_size),
		maxSize: normalizeExportText(row.maximum_size),
		fishingMethod: formatFishingMethod(row),
		tidal: normalizeOptionalText(row.tidal),
		watersCategory: normalizeOptionalText(row.water_type),
		boundary: normalizeOptionalText(row.boundary),
		water: normalizeOptionalText(water?.name),
		waterDescription: normalizeOptionalText(row.water_description),
		note: normalizeExportText(row.note),
		sourcePage: (row.source_page as number | null) ?? null,
		sourceTable: (row.source_table as string | null) ?? null,
		sourceRow: (row.source_row as string | null) ?? null,
	}
}

export function sortNormalizedRecords(records: NormalizedRecord[]): NormalizedRecord[] {
	return [...records].sort((a, b) => {
		let startComparison: number | null = null

		if (a.fishingMethod) {
			startComparison = a.fishingMethod.localeCompare(b.fishingMethod)
		}

		if (!startComparison && a.seasonStart && b.seasonStart) {
			startComparison = compareAsc(a.seasonStart, b.seasonStart)
		}

		if (!startComparison && a.boundary) {
			startComparison = b.boundary.localeCompare(a.boundary)
		}

		if (!startComparison) {
			if (a.water || a.fishingMethod || a.tidal || a.waterDescription) {
				return 1
			}
			if (a.seasonEnd && b.seasonEnd) {
				return compareAsc(b.seasonEnd, a.seasonEnd)
			}
		}

		return startComparison ?? 0
	})
}

const GROUP_KEY_FIELDS = [
	'note',
	'fishingMethod',
	'tidal',
	'waterDescription',
	'water',
	'boundary',
	'watersCategory',
] as const

export function groupKey(record: NormalizedRecord): string {
	if (record.isExceptionRow) {
		return `exception-${record.id}-${record.pairedRestrictionId ?? ''}-${record.seasonStart?.getTime() ?? ''}-${record.seasonEnd?.getTime() ?? ''}`
	}

	return GROUP_KEY_FIELDS.map((name) => String(record[name] ?? '')).join('-')
}

/** Groups restrictions/exceptions by specific water (id or name); general rows share one bucket. */
export function waterGroupKey(record: NormalizedRecord): string {
	if (record.waterId != null) {
		return `id:${record.waterId}`
	}
	if (record.water) {
		return `name:${record.water}`
	}
	return '__general__'
}

export function waterGroupSortName(record: NormalizedRecord): string {
	return record.water || record.watersCategory || ''
}

/** Legacy shape for FishRestrictionsExceptionsTable placeholder */
export interface FishingRestriction {
	id: number
	isException: boolean
	seasonStart: Date | null
	seasonEnd: Date | null
	bagLimit: number | null
	hookLimit: number | null
	minSize: string | null
	maxSize: string | null
	fishingMethod: string
	tidal: string
	water: string
	watersCategory: string
	boundary: string
	waterDescription: string
	note: string | null
	sourcePage: number | null
	sourceTable: string | null
	sourceRow: string | null
}

export function toLegacyRestriction(record: NormalizedRecord): FishingRestriction {
	return {
		id: record.id,
		isException: record.isException,
		seasonStart: record.seasonStart,
		seasonEnd: record.seasonEnd,
		bagLimit: record.bagLimit,
		hookLimit: record.hookLimit,
		minSize: record.minSize,
		maxSize: record.maxSize,
		fishingMethod: record.fishingMethod,
		tidal: record.tidal,
		water: record.water,
		watersCategory: record.watersCategory,
		boundary: record.boundary,
		waterDescription: record.waterDescription,
		note: record.note,
		sourcePage: record.sourcePage,
		sourceTable: record.sourceTable,
		sourceRow: record.sourceRow,
	}
}

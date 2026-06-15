import { formatRestrictionDetail } from './formatRestrictionDetail'
import { annotateSeasonBoundaries, collectMatchingExceptions } from './applyExceptions'
import {
	groupKey,
	sortNormalizedRecords,
	toLegacyRestriction,
	waterGroupKey,
	waterGroupSortName,
} from './FishingRestrictionsTransformers'
import type { NormalizedRecord } from './restrictionRecordTypes'
import type {
	DataTableRow,
	ExceptionsHeadingTableRow,
	GroupFooterTableRow,
	TableRow,
	VerifySource,
} from './restrictionTableTypes'

function verifySource(record: NormalizedRecord): VerifySource {
	return toLegacyRestriction(record)
}

export type BuildTableRowsOptions = {
	onWaterPage?: boolean
	overlapExceptions?: NormalizedRecord[]
	fishId?: number | null
}

type WaterRowEmitter = {
	nextContinue: () => boolean
}

function createWaterRowEmitter(onWaterPage: boolean): WaterRowEmitter {
	let isFirstRowInWater = true

	return {
		nextContinue() {
			if (onWaterPage) {
				return false
			}

			const waterGroupContinue = !isFirstRowInWater
			isFirstRowInWater = false
			return waterGroupContinue
		},
	}
}

function locationDetailFor(record: NormalizedRecord, onWaterPage: boolean): string {
	return formatRestrictionDetail(
		{
			tidal: record.tidal,
			boundary: record.boundary,
			watersCategory: record.watersCategory,
			water: record.water,
			fishingMethod: record.fishingMethod,
			waterDescription: record.waterDescription,
		},
		onWaterPage,
	)
}

function sizeInvalid(record: NormalizedRecord): boolean {
	return record.bagLimit === 0 && !record.hookLimit
}

function overlapFieldsForRestriction(
	record: NormalizedRecord,
	options: BuildTableRowsOptions,
): Pick<
	DataTableRow,
	'strikeSeasonStart' | 'strikeSeasonEnd' | 'replacementSeasonStart' | 'replacementSeasonEnd'
> {
	if (!options.overlapExceptions?.length) {
		return {}
	}

	const annotation = annotateSeasonBoundaries(
		record,
		options.overlapExceptions,
		options.fishId ?? null,
		!!options.onWaterPage,
	)

	if (!annotation) {
		return {}
	}

	return {
		strikeSeasonStart: annotation.strikeSeasonStart,
		strikeSeasonEnd: annotation.strikeSeasonEnd,
		replacementSeasonStart: annotation.replacementSeasonStart,
		replacementSeasonEnd: annotation.replacementSeasonEnd,
	}
}

function dataRowFromRecord(
	record: NormalizedRecord,
	options: {
		key: string
		dateTrailingComma: boolean
		showLocationDetail: boolean
		rowClassName: string
		onWaterPage: boolean
		waterGroupContinue: boolean
		asExceptionRow?: boolean
		overlapOptions?: BuildTableRowsOptions
	},
): DataTableRow | null {
	if (!record.seasonStart || !record.seasonEnd) {
		return null
	}

	const isExceptionRow = options.asExceptionRow ?? !!record.isExceptionRow
	const exceptionNoteSpan =
		isExceptionRow &&
		record.bagLimit === null &&
		!record.hookLimit &&
		record.minSize === null &&
		record.maxSize === null
	const hideBagLimit =
		!exceptionNoteSpan && isExceptionRow && record.bagLimit === null && !record.hookLimit
	const hideMinSize = !exceptionNoteSpan && isExceptionRow && record.minSize === null
	const hideMaxSize = !exceptionNoteSpan && isExceptionRow && record.maxSize === null
	const overlapFields =
		!isExceptionRow && options.overlapOptions
			? overlapFieldsForRestriction(record, options.overlapOptions)
			: {}

	return {
		kind: 'data',
		key: options.key,
		verify: verifySource(record),
		seasonStart: record.seasonStart,
		seasonEnd: record.seasonEnd,
		dateTrailingComma: options.dateTrailingComma,
		showLocationDetail: options.showLocationDetail,
		locationDetail: locationDetailFor(record, options.onWaterPage),
		note: record.note,
		bagLimit: record.bagLimit,
		bagLimitShowInfinity: !hideBagLimit && record.bagLimit === null,
		hookLimit: record.hookLimit,
		minSize: record.minSize ?? 'N/A',
		maxSize: record.maxSize ?? 'N/A',
		minSizeInvalid: sizeInvalid(record),
		maxSizeInvalid: sizeInvalid(record),
		hideBagLimit,
		hideMinSize,
		hideMaxSize,
		exceptionNoteSpan,
		isExceptionRow,
		hasOverlap: isExceptionRow,
		rowClassName: options.rowClassName,
		waterGroupContinue: options.waterGroupContinue,
		...overlapFields,
	}
}

function groupFooterFromRecord(
	record: NormalizedRecord,
	key: string,
	onWaterPage: boolean,
	waterGroupContinue: boolean,
): GroupFooterTableRow {
	return {
		kind: 'group-footer',
		key,
		verify: verifySource(record),
		locationDetail: locationDetailFor(record, onWaterPage),
		note: record.note,
		waterGroupContinue,
	}
}

function exceptionsHeadingRow(
	waterKey: string,
	waterGroupContinue: boolean,
): ExceptionsHeadingTableRow {
	return {
		kind: 'exceptions-heading',
		key: `exceptions-heading-${waterKey}`,
		waterGroupContinue,
	}
}

function tableRowsFromGroup(
	members: NormalizedRecord[],
	onWaterPage: boolean,
	overlapOptions: BuildTableRowsOptions,
	waterEmitter: WaterRowEmitter,
): TableRow[] {
	if (members.length === 0) {
		return []
	}

	if (members.length === 1) {
		const row = dataRowFromRecord(members[0], {
			key: `data-${members[0].id}-${members[0].seasonStart?.getTime()}`,
			dateTrailingComma: false,
			showLocationDetail: true,
			rowClassName: '',
			onWaterPage,
			waterGroupContinue: waterEmitter.nextContinue(),
			overlapOptions,
		})
		return row ? [row] : []
	}

	const rows: TableRow[] = []

	members.forEach((record, index) => {
		const row = dataRowFromRecord(record, {
			key: `data-${record.id}-${record.seasonStart?.getTime()}-${index}`,
			dateTrailingComma: index < members.length - 1,
			showLocationDetail: false,
			rowClassName: index === 0 ? '' : 'group',
			onWaterPage,
			waterGroupContinue: waterEmitter.nextContinue(),
			overlapOptions,
		})
		if (row) {
			rows.push(row)
		}
	})

	rows.push(
		groupFooterFromRecord(
			members[0],
			`footer-${members[0].id}-${groupKey(members[0])}`,
			onWaterPage,
			waterEmitter.nextContinue(),
		),
	)

	return rows
}

function exceptionRowsFromRecords(
	exceptions: NormalizedRecord[],
	onWaterPage: boolean,
	waterEmitter: WaterRowEmitter,
): DataTableRow[] {
	const rows: DataTableRow[] = []

	exceptions.forEach((record) => {
		const row = dataRowFromRecord(record, {
			key: `exc-${record.id}-${record.seasonStart?.getTime()}`,
			dateTrailingComma: false,
			showLocationDetail: true,
			rowClassName: 'exception-section',
			onWaterPage,
			waterGroupContinue: waterEmitter.nextContinue(),
			asExceptionRow: true,
		})
		if (row) {
			rows.push(row)
		}
	})

	return rows
}

function restrictionGroupsInOrder(waterRecords: NormalizedRecord[]): NormalizedRecord[][] {
	const groupOrder: string[] = []
	const groups = new Map<string, NormalizedRecord[]>()

	for (const record of waterRecords) {
		const key = groupKey(record)
		if (!groups.has(key)) {
			groupOrder.push(key)
			groups.set(key, [])
		}
		groups.get(key)!.push(record)
	}

	return groupOrder.map((key) => groups.get(key)!)
}

export function buildTableRows(
	records: NormalizedRecord[],
	options: BuildTableRowsOptions = {},
): TableRow[] {
	const onWaterPage = !!options.onWaterPage
	const sorted = sortNormalizedRecords(records)
	const waterBuckets = new Map<string, NormalizedRecord[]>()

	for (const record of sorted) {
		const key = waterGroupKey(record)
		const bucket = waterBuckets.get(key) ?? []
		bucket.push(record)
		waterBuckets.set(key, bucket)
	}

	const waterKeys = [...waterBuckets.keys()].sort((a, b) => {
		const nameA = waterBuckets.get(a)?.[0] ? waterGroupSortName(waterBuckets.get(a)![0]) : ''
		const nameB = waterBuckets.get(b)?.[0] ? waterGroupSortName(waterBuckets.get(b)![0]) : ''
		return nameA.localeCompare(nameB)
	})

	const rows: TableRow[] = []
	const overlapExceptions = options.overlapExceptions ?? []
	const fishId = options.fishId ?? null

	for (const waterKey of waterKeys) {
		const waterRecords = waterBuckets.get(waterKey) ?? []
		const waterEmitter = createWaterRowEmitter(onWaterPage)

		for (const members of restrictionGroupsInOrder(waterRecords)) {
			rows.push(...tableRowsFromGroup(members, onWaterPage, options, waterEmitter))
		}

		const waterExceptions = collectMatchingExceptions(
			waterRecords,
			overlapExceptions,
			fishId,
			onWaterPage,
		)

		if (waterExceptions.length > 0) {
			rows.push(exceptionsHeadingRow(waterKey, waterEmitter.nextContinue()))
			rows.push(...exceptionRowsFromRecords(waterExceptions, onWaterPage, waterEmitter))
		}
	}

	return rows
}

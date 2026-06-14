import { formatRestrictionDetail } from './formatRestrictionDetail'
import { groupKey, sortNormalizedRecords } from './FishingRestrictionsTransformers'
import type { NormalizedRecord } from './restrictionRecordTypes'
import type {
	DataTableRow,
	GroupFooterTableRow,
	TableRow,
	VerifySource,
} from './restrictionTableTypes'

function verifySource(record: NormalizedRecord): VerifySource {
	const overlay = record.exceptionOverlay
	return {
		id: overlay ? record.id : record.id,
		sourcePage: overlay?.sourcePage ?? record.sourcePage,
		sourceTable: overlay?.sourceTable ?? record.sourceTable,
		sourceRow: overlay?.sourceRow ?? record.sourceRow,
	}
}

function locationDetailFor(record: NormalizedRecord): string {
	return formatRestrictionDetail({
		tidal: record.tidal,
		boundary: record.boundary,
		watersCategory: record.watersCategory,
		water: record.water,
		fishingMethod: record.exceptionOverlay ? '' : record.fishingMethod,
		waterDescription: record.exceptionOverlay ? '' : record.waterDescription,
	})
}

function exceptionDetailFor(record: NormalizedRecord): string {
	if (!record.exceptionOverlay) {
		return ''
	}

	return formatRestrictionDetail({
		water: record.water,
		fishingMethod: record.exceptionOverlay.fishingMethod,
		waterDescription: record.exceptionOverlay.waterDescription,
	})
}

function sizeInvalid(record: NormalizedRecord): boolean {
	return record.bagLimit === 0 && !record.hookLimit
}

function dataRowFromRecord(
	record: NormalizedRecord,
	options: {
		key: string
		dateTrailingComma: boolean
		showLocationDetail: boolean
		rowClassName: string
	},
): DataTableRow | null {
	if (!record.seasonStart || !record.seasonEnd) {
		return null
	}

	const note = record.exceptionOverlay?.note ?? record.note

	return {
		kind: 'data',
		key: options.key,
		verify: verifySource(record),
		seasonStart: record.seasonStart,
		seasonEnd: record.seasonEnd,
		dateTrailingComma: options.dateTrailingComma,
		showLocationDetail: options.showLocationDetail,
		locationDetail: locationDetailFor(record),
		exceptionDetail: exceptionDetailFor(record),
		note,
		bagLimit: record.bagLimit,
		bagLimitShowInfinity: record.bagLimit === null,
		hookLimit: record.hookLimit,
		minSize: record.minSize ?? 'N/A',
		maxSize: record.maxSize ?? 'N/A',
		minSizeInvalid: sizeInvalid(record),
		maxSizeInvalid: sizeInvalid(record),
		rowClassName: options.rowClassName,
	}
}

function groupFooterFromRecord(record: NormalizedRecord, key: string): GroupFooterTableRow {
	return {
		kind: 'group-footer',
		key,
		verify: verifySource(record),
		locationDetail: formatRestrictionDetail({
			tidal: record.tidal,
			boundary: record.boundary,
			watersCategory: record.watersCategory,
			water: record.water,
			fishingMethod: record.fishingMethod,
			waterDescription: record.waterDescription,
		}),
		exceptionDetail: exceptionDetailFor(record),
		note: record.exceptionOverlay?.note ?? record.note,
	}
}

export function buildTableRows(records: NormalizedRecord[]): TableRow[] {
	const sorted = sortNormalizedRecords(records)
	const groups = new Map<string, NormalizedRecord[]>()

	for (const record of sorted) {
		const key = groupKey(record)
		const bucket = groups.get(key) ?? []
		bucket.push(record)
		groups.set(key, bucket)
	}

	const rows: TableRow[] = []

	for (const [, members] of groups) {
		if (members.length === 1) {
			const row = dataRowFromRecord(members[0], {
				key: `data-${members[0].id}-${members[0].seasonStart?.getTime()}`,
				dateTrailingComma: false,
				showLocationDetail: true,
				rowClassName: '',
			})
			if (row) {
				rows.push(row)
			}
			continue
		}

		members.forEach((record, index) => {
			const row = dataRowFromRecord(record, {
				key: `data-${record.id}-${record.seasonStart?.getTime()}-${index}`,
				dateTrailingComma: index < members.length - 1,
				showLocationDetail: false,
				rowClassName: index === 0 ? '' : 'group',
			})
			if (row) {
				rows.push(row)
			}
		})

		rows.push(
			groupFooterFromRecord(members[0], `footer-${members[0].id}-${groupKey(members[0])}`),
		)
	}

	return rows
}

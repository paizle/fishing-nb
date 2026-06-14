import { addDays, compareAsc, max, min } from 'date-fns'
import type { DateInterval, ExceptionOverlay, NormalizedRecord } from './restrictionRecordTypes'

function isValidSeason(start: Date | null, end: Date | null): start is Date {
	return start !== null && end !== null && compareAsc(start, end) <= 0
}

function interval(record: NormalizedRecord): DateInterval {
	return { start: record.seasonStart!, end: record.seasonEnd! }
}

function intersect(a: DateInterval, b: DateInterval): DateInterval | null {
	const start = max([a.start, b.start])
	const end = min([a.end, b.end])
	if (compareAsc(start, end) > 0) {
		return null
	}
	return { start, end }
}

function validInterval(segment: DateInterval): boolean {
	return compareAsc(segment.end, segment.start) >= 0
}

function exceptionOnlySegments(restriction: DateInterval, exception: DateInterval): DateInterval[] {
	const overlap = intersect(restriction, exception)
	if (!overlap) {
		return [exception]
	}

	const segments: DateInterval[] = []

	if (compareAsc(exception.start, overlap.start) < 0) {
		segments.push({ start: exception.start, end: addDays(overlap.start, -1) })
	}

	if (compareAsc(overlap.end, exception.end) < 0) {
		segments.push({ start: addDays(overlap.end, 1), end: exception.end })
	}

	return segments.filter(validInterval)
}

function overlayFromException(exception: NormalizedRecord): ExceptionOverlay {
	return {
		waterDescription: exception.waterDescription,
		note: exception.note,
		fishingMethod: exception.fishingMethod,
		sourcePage: exception.sourcePage,
		sourceTable: exception.sourceTable,
		sourceRow: exception.sourceRow,
	}
}

function cloneWithSeason(
	record: NormalizedRecord,
	season: DateInterval,
	overlay?: ExceptionOverlay,
): NormalizedRecord {
	return {
		...record,
		seasonStart: season.start,
		seasonEnd: season.end,
		fishingMethod: overlay?.fishingMethod || record.fishingMethod,
		exceptionOverlay: overlay,
	}
}

function makeExceptionOnlyRow(
	restriction: NormalizedRecord,
	exception: NormalizedRecord,
	season: DateInterval,
): NormalizedRecord {
	const overlay = overlayFromException(exception)
	return {
		...restriction,
		id: exception.id,
		seasonStart: season.start,
		seasonEnd: season.end,
		fishingMethod: exception.fishingMethod || restriction.fishingMethod,
		waterDescription: restriction.waterDescription,
		note: exception.note ?? restriction.note,
		sourcePage: exception.sourcePage,
		sourceTable: exception.sourceTable,
		sourceRow: exception.sourceRow,
		exceptionOverlay: overlay,
	}
}

function applyOneException(
	restriction: NormalizedRecord,
	exception: NormalizedRecord,
): NormalizedRecord[] {
	if (!isValidSeason(restriction.seasonStart, restriction.seasonEnd)) {
		return [restriction]
	}
	if (!isValidSeason(exception.seasonStart, exception.seasonEnd)) {
		return [restriction]
	}

	const restrictionInterval = interval(restriction)
	const exceptionInterval = interval(exception)
	const overlap = intersect(restrictionInterval, exceptionInterval)
	const overlay = overlayFromException(exception)
	const rows: NormalizedRecord[] = []

	if (!overlap) {
		rows.push(restriction)
		for (const segment of exceptionOnlySegments(restrictionInterval, exceptionInterval)) {
			rows.push(makeExceptionOnlyRow(restriction, exception, segment))
		}
		return rows
	}

	if (compareAsc(restrictionInterval.start, overlap.start) < 0) {
		rows.push(
			cloneWithSeason(restriction, {
				start: restrictionInterval.start,
				end: addDays(overlap.start, -1),
			}),
		)
	}

	rows.push(cloneWithSeason(restriction, overlap, overlay))

	if (compareAsc(overlap.end, restrictionInterval.end) < 0) {
		rows.push(
			cloneWithSeason(restriction, {
				start: addDays(overlap.end, 1),
				end: restrictionInterval.end,
			}),
		)
	}

	for (const segment of exceptionOnlySegments(restrictionInterval, exceptionInterval)) {
		rows.push(makeExceptionOnlyRow(restriction, exception, segment))
	}

	return rows
}

function exceptionMatchesFish(exception: NormalizedRecord, fishId: number | null): boolean {
	if (exception.fishId === null) {
		return true
	}
	return exception.fishId === fishId
}

export function applyExceptionsToRecords(
	restrictions: NormalizedRecord[],
	exceptions: NormalizedRecord[],
	fishId: number | null,
): NormalizedRecord[] {
	const datedExceptions = exceptions.filter((row) =>
		isValidSeason(row.seasonStart, row.seasonEnd),
	)

	if (datedExceptions.length === 0) {
		return restrictions
	}

	return restrictions.flatMap((restriction) => {
		let segments = [restriction]

		for (const exception of datedExceptions) {
			if (!exceptionMatchesFish(exception, fishId)) {
				continue
			}

			segments = segments.flatMap((segment) => applyOneException(segment, exception))
		}

		return segments
	})
}

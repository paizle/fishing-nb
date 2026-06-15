import { addDays, compareAsc, max, min, subDays } from 'date-fns'
import type { DateInterval, NormalizedRecord } from './restrictionRecordTypes'

function isValidSeason(start: Date | null, end: Date | null): start is Date {
	return start !== null && end !== null && compareAsc(start, end) <= 0
}

function interval(record: NormalizedRecord): DateInterval | null {
	if (!isValidSeason(record.seasonStart, record.seasonEnd)) {
		return null
	}
	return { start: record.seasonStart, end: record.seasonEnd }
}

function seasonsOverlap(a: DateInterval, b: DateInterval): boolean {
	const start = max([a.start, b.start])
	const end = min([a.end, b.end])
	return compareAsc(start, end) <= 0
}

function exceptionMatchesFish(exception: NormalizedRecord, fishId: number | null): boolean {
	if (exception.fishId === null) {
		return true
	}
	return exception.fishId === fishId
}

function exceptionAppliesToRestriction(
	exception: NormalizedRecord,
	restriction: NormalizedRecord,
	onWaterPage: boolean,
): boolean {
	if (exception.waterId == null) {
		return true
	}

	if (restriction.waterId != null) {
		return restriction.waterId === exception.waterId
	}

	if (!onWaterPage) {
		return false
	}

	if (!restriction.watersCategory) {
		return true
	}

	return restriction.watersCategory === exception.watersCategory
}

function exceptionOverlapsRestriction(
	exception: NormalizedRecord,
	restriction: NormalizedRecord,
): boolean {
	const exceptionInterval = interval(exception)
	const restrictionInterval = interval(restriction)
	if (!exceptionInterval || !restrictionInterval) {
		return false
	}
	return seasonsOverlap(exceptionInterval, restrictionInterval)
}

function sortBySeasonStart(records: NormalizedRecord[]): NormalizedRecord[] {
	return [...records].sort((a, b) => {
		if (!a.seasonStart || !b.seasonStart) {
			return 0
		}

		const startComparison = compareAsc(a.seasonStart, b.seasonStart)
		if (startComparison !== 0) {
			return startComparison
		}

		if (!a.seasonEnd || !b.seasonEnd) {
			return 0
		}

		return compareAsc(a.seasonEnd, b.seasonEnd)
	})
}

function restrictionMatchesException(
	restriction: NormalizedRecord,
	exception: NormalizedRecord,
	fishId: number | null,
	onWaterPage: boolean,
): boolean {
	return (
		exceptionMatchesFish(exception, fishId) &&
		exceptionAppliesToRestriction(exception, restriction, onWaterPage) &&
		exceptionOverlapsRestriction(exception, restriction)
	)
}

function overlapInterval(
	restriction: NormalizedRecord,
	exception: NormalizedRecord,
): DateInterval | null {
	const exceptionInterval = interval(exception)
	const restrictionInterval = interval(restriction)
	if (!exceptionInterval || !restrictionInterval) {
		return null
	}
	if (!seasonsOverlap(exceptionInterval, restrictionInterval)) {
		return null
	}
	return {
		start: max([exceptionInterval.start, restrictionInterval.start]),
		end: min([exceptionInterval.end, restrictionInterval.end]),
	}
}

function dateWithinInterval(date: Date, { start, end }: DateInterval): boolean {
	return compareAsc(date, start) >= 0 && compareAsc(date, end) <= 0
}

function earliestSeasonStart(candidates: NormalizedRecord[]): Date | null {
	let best: Date | null = null

	for (const candidate of candidates) {
		if (!candidate.seasonStart) {
			continue
		}
		if (!best || compareAsc(candidate.seasonStart, best) < 0) {
			best = candidate.seasonStart
		}
	}

	return best
}

function earliestSeasonEnd(candidates: NormalizedRecord[]): Date | null {
	let best: Date | null = null

	for (const candidate of candidates) {
		if (!candidate.seasonEnd) {
			continue
		}
		if (!best || compareAsc(candidate.seasonEnd, best) < 0) {
			best = candidate.seasonEnd
		}
	}

	return best
}

function replacementSeasonStartFrom(candidates: NormalizedRecord[]): Date | undefined {
	const end = earliestSeasonEnd(candidates)
	return end ? addDays(end, 1) : undefined
}

function replacementSeasonEndFrom(candidates: NormalizedRecord[]): Date | undefined {
	const start = earliestSeasonStart(candidates)
	return start ? subDays(start, 1) : undefined
}

export type SeasonBoundaryAnnotation = {
	strikeSeasonStart: boolean
	strikeSeasonEnd: boolean
	replacementSeasonStart?: Date
	replacementSeasonEnd?: Date
}

export function annotateSeasonBoundaries(
	restriction: NormalizedRecord,
	exceptions: NormalizedRecord[],
	fishId: number | null,
	onWaterPage: boolean,
): SeasonBoundaryAnnotation | null {
	if (!restriction.seasonStart || !restriction.seasonEnd) {
		return null
	}

	const startCandidates: NormalizedRecord[] = []
	const endCandidates: NormalizedRecord[] = []

	for (const exception of exceptions) {
		if (!restrictionMatchesException(restriction, exception, fishId, onWaterPage)) {
			continue
		}

		const overlap = overlapInterval(restriction, exception)
		if (!overlap) {
			continue
		}

		if (dateWithinInterval(restriction.seasonStart, overlap)) {
			startCandidates.push(exception)
		}

		if (dateWithinInterval(restriction.seasonEnd, overlap)) {
			endCandidates.push(exception)
		}
	}

	const strikeSeasonStart = startCandidates.length > 0
	const strikeSeasonEnd = endCandidates.length > 0

	if (!strikeSeasonStart && !strikeSeasonEnd) {
		return null
	}

	const replacementSeasonStart = strikeSeasonStart
		? replacementSeasonStartFrom(startCandidates)
		: undefined
	const replacementSeasonEnd = strikeSeasonEnd
		? replacementSeasonEndFrom(endCandidates)
		: undefined

	return {
		strikeSeasonStart,
		strikeSeasonEnd,
		replacementSeasonStart,
		replacementSeasonEnd,
	}
}

export function collectMatchingExceptions(
	restrictions: NormalizedRecord[],
	exceptions: NormalizedRecord[],
	fishId: number | null,
	onWaterPage: boolean,
): NormalizedRecord[] {
	const datedExceptions = exceptions.filter((row) =>
		isValidSeason(row.seasonStart, row.seasonEnd),
	)
	const seen = new Set<number>()
	const matched: NormalizedRecord[] = []

	for (const exception of datedExceptions) {
		if (!exceptionMatchesFish(exception, fishId) || seen.has(exception.id)) {
			continue
		}

		const overlaps = restrictions.some((restriction) =>
			restrictionMatchesException(restriction, exception, fishId, onWaterPage),
		)

		if (!overlaps) {
			continue
		}

		seen.add(exception.id)
		matched.push(exception)
	}

	return sortBySeasonStart(matched)
}

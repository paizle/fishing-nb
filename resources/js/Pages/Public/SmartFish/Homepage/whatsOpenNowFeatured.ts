import { FEATURED_DISPLAY } from './fishGroups'

export type CalendarEntry = {
	fishId: number
	fishName: string
	status: string
	statusLabel: string
	statusClass: string
}

export type CalendarDay = {
	date: string
	label: string
	entries: CalendarEntry[]
}

export type CalendarResponse = {
	anchorDate: string
	monthLabel: string
	prevMonthDate: string
	nextMonthDate: string
	regulationYear: number
	days: CalendarDay[]
}

export type FeaturedDisplayRow = {
	fishName: string
	statusLabel: string
	statusClass: string
}

export { FEATURED_DISPLAY } from './fishGroups'

const STATUS_PRECEDENCE = ['open', 'catch_release', 'closed'] as const

export function findTodayEntries(calendar: CalendarResponse): CalendarEntry[] {
	const day = calendar.days.find((entry) => entry.date === calendar.anchorDate)

	return day?.entries ?? []
}

export function mergeStatuses(entries: CalendarEntry[]): CalendarEntry | null {
	if (entries.length === 0) {
		return null
	}

	for (const status of STATUS_PRECEDENCE) {
		const match = entries.find((entry) => entry.status === status)

		if (match) {
			return match
		}
	}

	return entries[0] ?? null
}

export function pickFeaturedRows(entries: CalendarEntry[]): FeaturedDisplayRow[] {
	return FEATURED_DISPLAY.map(({ displayName, matchNames }) => {
		const matched = entries.filter((entry) =>
			(matchNames as readonly string[]).includes(entry.fishName),
		)
		const winner = matchNames.length === 1 ? (matched[0] ?? null) : mergeStatuses(matched)

		if (!winner) {
			return {
				fishName: displayName,
				statusLabel: 'Closed',
				statusClass: 'closed',
			}
		}

		return {
			fishName: displayName,
			statusLabel: winner.statusLabel,
			statusClass: winner.statusClass,
		}
	})
}

import whatsOpenNowConfig from '@/data/whats_open_now.json'

export type WhatsOpenRowDef = {
	label: string
	species: string[]
}

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

export type WhatsOpenDisplayRow = {
	fishName: string
	statusLabel: string
	statusClass: string
}

export const WHATS_OPEN_ROWS = whatsOpenNowConfig as WhatsOpenRowDef[]

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

export function pickWhatsOpenRows(entries: CalendarEntry[]): WhatsOpenDisplayRow[] {
	return WHATS_OPEN_ROWS.map(({ label, species }) => {
		const matched = entries.filter((entry) => species.includes(entry.fishName))
		const winner = mergeStatuses(matched)

		if (!winner) {
			return {
				fishName: label,
				statusLabel: 'Closed',
				statusClass: 'closed',
			}
		}

		return {
			fishName: label,
			statusLabel: winner.statusLabel,
			statusClass: winner.statusClass,
		}
	})
}

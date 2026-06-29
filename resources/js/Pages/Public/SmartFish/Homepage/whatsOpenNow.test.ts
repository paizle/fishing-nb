import { describe, expect, it } from 'vitest'
import {
	findTodayEntries,
	mergeStatuses,
	pickWhatsOpenRows,
	WHATS_OPEN_ROWS,
	type CalendarEntry,
	type CalendarResponse,
} from './whatsOpenNow'

const entry = (
	fishName: string,
	status: string,
	statusLabel: string,
	statusClass: string,
	fishId = 1,
): CalendarEntry => ({
	fishId,
	fishName,
	status,
	statusLabel,
	statusClass,
})

describe('WHATS_OPEN_ROWS', () => {
	it('lists five rows in config order', () => {
		expect(WHATS_OPEN_ROWS.map((row) => row.label)).toEqual([
			'Atlantic Salmon',
			'Landlocked Salmon',
			'Trout',
			'Smallmouth Bass',
			'Non-Sport Fish',
		])
	})
})

describe('findTodayEntries', () => {
	it('returns entries for anchorDate', () => {
		const calendar: CalendarResponse = {
			anchorDate: '2026-06-15',
			monthLabel: 'June 2026',
			prevMonthDate: '2026-05-01',
			nextMonthDate: '2026-07-01',
			regulationYear: 2026,
			days: [
				{
					date: '2026-06-15',
					label: 'Monday, June 15',
					entries: [entry('Brook Trout', 'open', 'Open', 'open', 18)],
				},
			],
		}

		expect(findTodayEntries(calendar)).toHaveLength(1)
	})
})

describe('mergeStatuses', () => {
	it('prefers open over catch_release and closed', () => {
		const merged = mergeStatuses([
			entry('Bright Salmon', 'closed', 'Closed', 'closed', 1),
			entry('Spring Kelt', 'catch_release', 'Catch & release', 'catch-release', 2),
			entry('Brook Trout', 'open', 'Open', 'open', 18),
		])

		expect(merged?.status).toBe('open')
	})

	it('prefers catch_release over closed', () => {
		const merged = mergeStatuses([
			entry('Bright Salmon', 'closed', 'Closed', 'closed', 1),
			entry('Spring Kelt', 'catch_release', 'Catch & release', 'catch-release', 2),
		])

		expect(merged?.status).toBe('catch_release')
	})
})

describe('pickWhatsOpenRows', () => {
	it('returns five rows with Atlantic Salmon merge', () => {
		const rows = pickWhatsOpenRows([
			entry('Lake Trout', 'open', 'Open', 'open', 20),
			entry('Brook Trout', 'closed', 'Closed', 'closed', 18),
			entry('Bright Salmon', 'closed', 'Closed', 'closed', 1),
			entry('Spring Kelt', 'catch_release', 'Catch & release', 'catch-release', 2),
			entry('Smallmouth Bass', 'open', 'Open', 'open', 16),
		])

		expect(rows.map((row) => row.fishName)).toEqual([
			'Atlantic Salmon',
			'Landlocked Salmon',
			'Trout',
			'Smallmouth Bass',
			'Non-Sport Fish',
		])
		expect(rows[2]?.statusLabel).toBe('Open')
		expect(rows[0]?.statusLabel).toBe('Catch & release')
		expect(rows[0]?.statusClass).toBe('catch-release')
	})

	it('merges trout member species into one row', () => {
		const rows = pickWhatsOpenRows([
			entry('Rainbow Trout', 'open', 'Open', 'open', 19),
			entry('Brook Trout', 'closed', 'Closed', 'closed', 18),
		])

		expect(rows[2]?.fishName).toBe('Trout')
		expect(rows[2]?.statusLabel).toBe('Open')
	})

	it('uses method label from winning Atlantic Salmon entry', () => {
		const rows = pickWhatsOpenRows([
			entry('Bright Salmon', 'catch_release', 'Fly Fishing', 'catch-release', 1),
			entry('Spring Kelt', 'closed', 'Closed', 'closed', 2),
		])

		expect(rows[0]?.statusLabel).toBe('Fly Fishing')
	})
})

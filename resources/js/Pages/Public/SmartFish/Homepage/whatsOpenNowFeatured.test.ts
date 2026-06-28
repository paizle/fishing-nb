import { describe, expect, it } from 'vitest'
import { FEATURED_DISPLAY } from './fishGroups'
import {
	findTodayEntries,
	mergeStatuses,
	pickFeaturedRows,
	type CalendarEntry,
	type CalendarResponse,
} from './whatsOpenNowFeatured'

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

describe('FEATURED_DISPLAY', () => {
	it('lists five featured groups in fixed order', () => {
		expect(FEATURED_DISPLAY.map((row) => row.displayName)).toEqual([
			'Trout',
			'Smallmouth Bass',
			'Non-Sport Fish',
			'Landlocked Salmon',
			'Atlantic Salmon',
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

describe('pickFeaturedRows', () => {
	it('returns five rows in fixed order with Atlantic Salmon rollup', () => {
		const rows = pickFeaturedRows([
			entry('Lake Trout', 'open', 'Open', 'open', 20),
			entry('Brook Trout', 'closed', 'Closed', 'closed', 18),
			entry('Bright Salmon', 'closed', 'Closed', 'closed', 1),
			entry('Spring Kelt', 'catch_release', 'Catch & release', 'catch-release', 2),
			entry('Smallmouth Bass', 'open', 'Open', 'open', 16),
		])

		expect(rows.map((row) => row.fishName)).toEqual([
			'Trout',
			'Smallmouth Bass',
			'Non-Sport Fish',
			'Landlocked Salmon',
			'Atlantic Salmon',
		])
		expect(rows[0]?.statusLabel).toBe('Open')
		expect(rows[4]?.statusLabel).toBe('Catch & release')
		expect(rows[4]?.statusClass).toBe('catch-release')
	})

	it('rolls up trout group status from any member species', () => {
		const rows = pickFeaturedRows([
			entry('Rainbow Trout', 'open', 'Open', 'open', 19),
			entry('Brook Trout', 'closed', 'Closed', 'closed', 18),
		])

		expect(rows[0]?.fishName).toBe('Trout')
		expect(rows[0]?.statusLabel).toBe('Open')
	})

	it('uses method label from winning Atlantic Salmon entry', () => {
		const rows = pickFeaturedRows([
			entry('Bright Salmon', 'catch_release', 'Fly Fishing', 'catch-release', 1),
			entry('Spring Kelt', 'closed', 'Closed', 'closed', 2),
		])

		expect(rows[4]?.statusLabel).toBe('Fly Fishing')
	})
})

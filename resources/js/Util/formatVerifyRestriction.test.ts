import { describe, expect, it } from 'vitest'
import { formatVerifyRestriction } from './formatVerifyRestriction'

describe('formatVerifyRestriction', () => {
	it('omits undefined limit fields for exceptions', () => {
		const details = formatVerifyRestriction({
			restriction: {
				exceptionType: 'specifier',
				seasonStart: new Date('2026-01-01T12:00:00'),
				seasonEnd: new Date('2026-04-30T12:00:00'),
				bagLimit: null,
				minSize: null,
				maxSize: null,
				fishingMethod: 'Fly Fishing',
				tidal: '',
				water: '',
				watersCategory: 'rivers, brooks and streams',
				boundary: '',
				waterDescription:
					'upstream of the Route 11 Bridge (47??31\'41.3"N 64??56\'02.7"W to 47??31\'52.5"N 64??56\'00.3"W)',
			},
			fishName: 'Atlantic Salmon',
			regionName: 'Chaleur',
			isMobile: false,
		})

		expect(details.limits).toBeNull()
		expect(details.water).toContain('47°31')
		expect(details.water).not.toContain('??')
	})

	it('shows bag limit 0 for exceptions', () => {
		const details = formatVerifyRestriction({
			restriction: {
				exceptionType: 'specifier',
				seasonStart: new Date('2026-09-01T12:00:00'),
				seasonEnd: new Date('2026-12-31T12:00:00'),
				bagLimit: 0,
				minSize: null,
				maxSize: null,
				fishingMethod: '',
				tidal: '',
				water: 'First Lake (Green River)',
				watersCategory: 'lakes, ponds and reservoirs',
				boundary: '',
				waterDescription: '',
			},
			fishName: 'Landlocked Salmon',
			regionName: 'Upper Saint John',
			isMobile: false,
		})

		expect(details.limits).toEqual([{ label: 'Bag Limit', value: '0' }])
	})

	it('shows only defined limits for regular restrictions', () => {
		const details = formatVerifyRestriction({
			restriction: {
				exceptionType: null,
				seasonStart: new Date('2026-05-01T12:00:00'),
				seasonEnd: new Date('2026-09-15T12:00:00'),
				bagLimit: 5,
				minSize: '10cm',
				maxSize: null,
				fishingMethod: '',
				tidal: '',
				water: '',
				watersCategory: 'rivers, brooks and streams',
				boundary: '',
				waterDescription: '',
			},
			fishName: 'Brook Trout',
			regionName: 'Chaleur',
			isMobile: false,
		})

		expect(details.limits).toEqual([
			{ label: 'Bag Limit', value: '5' },
			{ label: 'Minimum Size', value: '10cm' },
		])
	})
})

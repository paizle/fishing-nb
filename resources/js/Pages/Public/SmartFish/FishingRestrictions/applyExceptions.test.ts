import { describe, expect, it } from 'vitest'
import { annotateSeasonBoundaries, collectMatchingExceptions } from './applyExceptions'
import type { NormalizedRecord } from './restrictionRecordTypes'

function d(iso: string): Date {
	return new Date(`${iso}T12:00:00`)
}

function record(
	overrides: Partial<NormalizedRecord> &
		Pick<NormalizedRecord, 'id' | 'seasonStart' | 'seasonEnd'>,
): NormalizedRecord {
	return {
		fishId: null,
		fishName: '',
		waterId: null,
		isException: false,
		bagLimit: null,
		hookLimit: null,
		minSize: null,
		maxSize: null,
		fishingMethod: '',
		tidal: '',
		water: '',
		watersCategory: '',
		boundary: '',
		waterDescription: '',
		note: null,
		sourcePage: null,
		sourceTable: null,
		sourceRow: null,
		...overrides,
	}
}

const exception107 = record({
	id: 107,
	isException: true,
	seasonStart: d('2026-01-01'),
	seasonEnd: d('2026-04-30'),
	waterId: 3,
	fishingMethod: 'fly fishing',
	waterDescription: 'upstream of a line',
})

const exception108 = record({
	id: 108,
	isException: true,
	seasonStart: d('2026-09-16'),
	seasonEnd: d('2026-12-31'),
	waterId: 3,
	fishingMethod: 'fly fishing',
	waterDescription: 'upstream of a line',
})

const tidalRestriction = record({
	id: 98,
	fishId: 4,
	seasonStart: d('2026-01-01'),
	seasonEnd: d('2026-12-30'),
	tidal: 'tidal',
})

const nonTidalRestriction = record({
	id: 97,
	fishId: 4,
	seasonStart: d('2026-01-01'),
	seasonEnd: d('2026-12-31'),
	tidal: 'non-tidal',
})

const salmonDownstream = record({
	id: 69,
	fishId: 1,
	seasonStart: d('2026-05-16'),
	seasonEnd: d('2026-10-29'),
	waterId: 3,
	water: 'Big Tracadie River',
	waterDescription: 'downstream of Lord & Foy Brook',
	fishingMethod: 'fly fishing',
})

const littleTracadie = record({
	id: 68,
	fishId: 1,
	seasonStart: d('2026-04-15'),
	seasonEnd: d('2026-05-15'),
	waterId: 4,
	water: 'Little Tracadie River',
	waterDescription: 'downstream of Lord & Foy Brook',
	fishingMethod: 'fly fishing',
})

const littleTracadieException = record({
	id: 201,
	isException: true,
	seasonStart: d('2026-01-01'),
	seasonEnd: d('2026-04-30'),
	waterId: 4,
	fishingMethod: 'fly fishing',
})

const exceptions = [exception107, exception108]

describe('annotateSeasonBoundaries', () => {
	it('annotates tidal Jan 1–Dec 30 with start May 1 and end Sept 15', () => {
		const result = annotateSeasonBoundaries(tidalRestriction, exceptions, 4, true)

		expect(result).toEqual({
			strikeSeasonStart: true,
			strikeSeasonEnd: true,
			replacementSeasonStart: d('2026-05-01'),
			replacementSeasonEnd: d('2026-09-15'),
		})
	})

	it('annotates non-tidal Jan 1–Dec 31 with start May 1 and end Sept 15', () => {
		const result = annotateSeasonBoundaries(nonTidalRestriction, exceptions, 4, true)

		expect(result).toEqual({
			strikeSeasonStart: true,
			strikeSeasonEnd: true,
			replacementSeasonStart: d('2026-05-01'),
			replacementSeasonEnd: d('2026-09-15'),
		})
	})

	it('annotates salmon downstream end with day before exception start', () => {
		const result = annotateSeasonBoundaries(salmonDownstream, exceptions, 1, false)

		expect(result).toEqual({
			strikeSeasonStart: false,
			strikeSeasonEnd: true,
			replacementSeasonEnd: d('2026-09-15'),
		})
	})

	it('annotates Little Tracadie start with day after exception end', () => {
		const result = annotateSeasonBoundaries(littleTracadie, [littleTracadieException], 1, false)

		expect(result).toEqual({
			strikeSeasonStart: true,
			strikeSeasonEnd: false,
			replacementSeasonStart: d('2026-05-01'),
		})
	})

	it('uses earliest exception end plus one day when multiple exceptions overlap start', () => {
		const restriction = record({
			id: 1,
			seasonStart: d('2026-03-01'),
			seasonEnd: d('2026-12-31'),
			waterId: 3,
		})
		const earlyStart = record({
			id: 10,
			isException: true,
			seasonStart: d('2026-01-01'),
			seasonEnd: d('2026-05-31'),
			waterId: 3,
		})
		const laterStart = record({
			id: 11,
			isException: true,
			seasonStart: d('2026-02-01'),
			seasonEnd: d('2026-06-30'),
			waterId: 3,
		})

		const result = annotateSeasonBoundaries(restriction, [earlyStart, laterStart], null, false)

		expect(result?.replacementSeasonStart).toEqual(d('2026-06-01'))
	})

	it('uses earliest exception start minus one day when multiple exceptions overlap end', () => {
		const restriction = record({
			id: 2,
			seasonStart: d('2026-01-01'),
			seasonEnd: d('2026-10-15'),
			waterId: 3,
		})
		const earlierEnd = record({
			id: 12,
			isException: true,
			seasonStart: d('2026-08-01'),
			seasonEnd: d('2026-10-31'),
			waterId: 3,
		})
		const laterEnd = record({
			id: 13,
			isException: true,
			seasonStart: d('2026-09-01'),
			seasonEnd: d('2026-12-31'),
			waterId: 3,
		})

		const result = annotateSeasonBoundaries(restriction, [earlierEnd, laterEnd], null, false)

		expect(result?.replacementSeasonEnd).toEqual(d('2026-07-31'))
	})
})

describe('collectMatchingExceptions', () => {
	it('returns both Big Tracadie exceptions on water page for general restrictions', () => {
		const matched = collectMatchingExceptions(
			[tidalRestriction, nonTidalRestriction],
			exceptions,
			4,
			true,
		)

		expect(matched.map((row) => row.id)).toEqual([107, 108])
	})

	it('matches Nictau Lake brook trout exception to regional lake rule on region page', () => {
		const nictauBrookTroutException = record({
			id: 701,
			isException: true,
			fishId: 18,
			waterId: 191,
			water: 'Nictau Lake',
			watersCategory: 'lakes, ponds and reservoirs',
			seasonStart: d('2026-01-01'),
			seasonEnd: d('2026-12-31'),
			bagLimit: 2,
			minSize: '25cm',
		})
		const regionalBrookTroutLake = record({
			id: 749,
			fishId: 18,
			watersCategory: 'lakes, ponds and reservoirs',
			boundary: 'non-boundary waters',
			seasonStart: d('2026-05-15'),
			seasonEnd: d('2026-09-15'),
			bagLimit: 5,
			minSize: '10cm',
		})
		const regionalBrookTroutRiver = record({
			id: 752,
			fishId: 18,
			watersCategory: 'rivers, brooks and streams',
			boundary: 'non-boundary waters',
			seasonStart: d('2026-04-15'),
			seasonEnd: d('2026-09-30'),
			bagLimit: 5,
			minSize: '10cm',
		})

		const matched = collectMatchingExceptions(
			[regionalBrookTroutLake, regionalBrookTroutRiver],
			[nictauBrookTroutException],
			18,
			false,
		)

		expect(matched.map((row) => row.id)).toEqual([701])
	})
})

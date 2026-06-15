import { describe, expect, it } from 'vitest'
import { buildTableRows } from './buildTableRows'
import type { NormalizedRecord } from './restrictionRecordTypes'

function d(iso: string): Date {
	return new Date(`${iso}T12:00:00`)
}

function record(
	overrides: Partial<NormalizedRecord> &
		Pick<NormalizedRecord, 'id' | 'seasonStart' | 'seasonEnd'>,
): NormalizedRecord {
	return {
		fishId: 1,
		fishName: 'Atlantic Salmon',
		waterId: null,
		isException: false,
		bagLimit: null,
		hookLimit: null,
		minSize: null,
		maxSize: null,
		fishingMethod: 'fly fishing',
		tidal: '',
		water: '',
		watersCategory: 'rivers, brooks and streams',
		boundary: '',
		waterDescription: '',
		note: null,
		sourcePage: null,
		sourceTable: null,
		sourceRow: null,
		...overrides,
	}
}

describe('buildTableRows waterGroupContinue', () => {
	it('marks continued rows within the same water on region page', () => {
		const bigTracadieDownstream = record({
			id: 69,
			waterId: 3,
			water: 'Big Tracadie River',
			waterDescription: 'downstream of Lord & Foy Brook',
			seasonStart: d('2026-05-16'),
			seasonEnd: d('2026-10-29'),
		})
		const bigTracadieUpstream = record({
			id: 70,
			waterId: 3,
			water: 'Big Tracadie River',
			waterDescription: 'upstream of Lord & Foy Brook',
			seasonStart: d('2026-06-01'),
			seasonEnd: d('2026-10-15'),
		})
		const littleTracadie = record({
			id: 68,
			waterId: 4,
			water: 'Little Tracadie River',
			waterDescription: 'downstream of Lord & Foy Brook',
			seasonStart: d('2026-04-15'),
			seasonEnd: d('2026-05-15'),
		})

		const rows = buildTableRows([bigTracadieDownstream, bigTracadieUpstream, littleTracadie], {
			onWaterPage: false,
		})

		const bigDownstream = rows.find(
			(row) => row.kind === 'data' && row.key.startsWith('data-69'),
		)
		const bigUpstream = rows.find((row) => row.kind === 'data' && row.key.startsWith('data-70'))
		const little = rows.find((row) => row.kind === 'data' && row.key.startsWith('data-68'))

		expect(bigDownstream?.kind === 'data' && bigDownstream.waterGroupContinue).toBe(false)
		expect(bigUpstream?.kind === 'data' && bigUpstream.waterGroupContinue).toBe(true)
		expect(little?.kind === 'data' && little.waterGroupContinue).toBe(false)
	})

	it('does not mark water-group-continue rows on water page', () => {
		const downstream = record({
			id: 69,
			waterId: 3,
			water: 'Big Tracadie River',
			waterDescription: 'downstream of Lord & Foy Brook',
			seasonStart: d('2026-05-16'),
			seasonEnd: d('2026-10-29'),
		})
		const upstream = record({
			id: 70,
			waterId: 3,
			water: 'Big Tracadie River',
			waterDescription: 'upstream of Lord & Foy Brook',
			seasonStart: d('2026-06-01'),
			seasonEnd: d('2026-10-15'),
		})

		const rows = buildTableRows([downstream, upstream], { onWaterPage: true })

		for (const row of rows) {
			if ('waterGroupContinue' in row) {
				expect(row.waterGroupContinue).toBeFalsy()
			}
		}
	})
})

describe('buildTableRows exception limit cells', () => {
	it('shows dashes for empty limit fields when another limit is set', () => {
		const baseLakeRule = record({
			id: 749,
			fishId: 18,
			fishName: 'Brook Trout',
			watersCategory: 'lakes, ponds and reservoirs',
			seasonStart: d('2026-05-15'),
			seasonEnd: d('2026-09-15'),
			bagLimit: 5,
			minSize: '10cm',
		})
		const nictauException = record({
			id: 701,
			fishId: 18,
			fishName: 'Brook Trout',
			isException: true,
			waterId: 191,
			water: 'Nictau Lake',
			watersCategory: 'lakes, ponds and reservoirs',
			seasonStart: d('2026-01-01'),
			seasonEnd: d('2026-12-31'),
			bagLimit: 2,
			minSize: '25cm',
			maxSize: null,
		})

		const rows = buildTableRows([baseLakeRule], {
			onWaterPage: false,
			overlapExceptions: [nictauException],
			fishId: 18,
		})

		const exceptionRow = rows.find(
			(row) => row.kind === 'data' && row.key.startsWith('exc-701'),
		)

		expect(exceptionRow?.kind).toBe('data')
		if (exceptionRow?.kind !== 'data') {
			return
		}

		expect(exceptionRow.exceptionNoteSpan).toBe(false)
		expect(exceptionRow.showExceptionLimitCells).toBe(true)
		expect(exceptionRow.bagLimit).toBe(2)
		expect(exceptionRow.minSize).toBe('25cm')
		expect(exceptionRow.maxSize).toBe('-')
		expect(exceptionRow.hideBagLimit).toBe(false)
		expect(exceptionRow.hideMaxSize).toBe(false)
	})

	it('shows note text when exception has no limit values', () => {
		const baseLakeRule = record({
			id: 749,
			fishId: 18,
			fishName: 'Brook Trout',
			watersCategory: 'lakes, ponds and reservoirs',
			seasonStart: d('2026-05-15'),
			seasonEnd: d('2026-09-15'),
			bagLimit: 5,
			minSize: '10cm',
		})
		const closedException = record({
			id: 688,
			fishId: null,
			fishName: 'Brook Trout',
			isException: true,
			waterId: 191,
			water: 'Nictau Lake',
			watersCategory: 'lakes, ponds and reservoirs',
			waterDescription: 'all brooks flowing into Nictau Lake',
			fishingMethod: 'angling',
			seasonStart: d('2026-01-01'),
			seasonEnd: d('2026-12-31'),
			note: 'Closed to angling',
		})

		const rows = buildTableRows([baseLakeRule], {
			onWaterPage: false,
			overlapExceptions: [closedException],
			fishId: 18,
		})

		const exceptionRow = rows.find(
			(row) => row.kind === 'data' && row.key.startsWith('exc-688'),
		)

		expect(exceptionRow?.kind).toBe('data')
		if (exceptionRow?.kind !== 'data') {
			return
		}

		expect(exceptionRow.exceptionNoteSpan).toBe(true)
		expect(exceptionRow.showExceptionLimitCells).toBe(false)
	})

	it('shows placeholder dashes for empty limit fields when bag limit is 0', () => {
		const baseLakeRule = record({
			id: 740,
			fishId: 3,
			fishName: 'Landlocked Salmon',
			watersCategory: 'lakes, ponds and reservoirs',
			seasonStart: d('2026-05-15'),
			seasonEnd: d('2026-09-30'),
			bagLimit: 2,
		})
		const bagZeroException = record({
			id: 704,
			fishId: 3,
			fishName: 'Landlocked Salmon',
			isException: true,
			waterId: 183,
			water: 'First Lake (Green River)',
			watersCategory: 'lakes, ponds and reservoirs',
			seasonStart: d('2026-09-01'),
			seasonEnd: d('2026-12-31'),
			bagLimit: 0,
		})

		const rows = buildTableRows([baseLakeRule], {
			onWaterPage: false,
			overlapExceptions: [bagZeroException],
			fishId: 3,
		})

		const exceptionRow = rows.find(
			(row) => row.kind === 'data' && row.key.startsWith('exc-704'),
		)

		expect(exceptionRow?.kind).toBe('data')
		if (exceptionRow?.kind !== 'data') {
			return
		}

		expect(exceptionRow.minSize).toBe('-')
		expect(exceptionRow.maxSize).toBe('-')
	})
})

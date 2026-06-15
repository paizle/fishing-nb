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

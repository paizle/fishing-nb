import { describe, expect, it } from 'vitest'
import { buildRegulationUrl } from './searchHelpers'

describe('buildRegulationUrl', () => {
	it('builds region-only path', () => {
		expect(buildRegulationUrl({ regionSlug: 'chaleur' })).toBe('/fish/chaleur')
	})

	it('builds water path', () => {
		expect(
			buildRegulationUrl({
				regionSlug: 'miramichi',
				waterSlug: 'miramichi-river',
			}),
		).toBe('/fish/miramichi/miramichi-river')
	})

	it('appends species query param', () => {
		expect(
			buildRegulationUrl({
				regionSlug: 'chaleur',
				waterSlug: 'bass-river',
				speciesSlug: 'burbot',
			}),
		).toBe('/fish/chaleur/bass-river?species=burbot')
	})

	it('appends species on region-only path', () => {
		expect(
			buildRegulationUrl({
				regionSlug: 'miramichi',
				speciesSlug: 'burbot',
			}),
		).toBe('/fish/miramichi?species=burbot')
	})
})

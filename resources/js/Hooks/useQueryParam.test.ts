import { describe, expect, it } from 'vitest'
import { applyPathname, applyQueryParam, readQueryParamFromSearch } from './useQueryParam'

describe('readQueryParamFromSearch', () => {
	it('returns null when param is absent', () => {
		expect(readQueryParamFromSearch('', 'species')).toBeNull()
	})

	it('reads an existing param', () => {
		expect(readQueryParamFromSearch('?species=brook-trout', 'species')).toBe('brook-trout')
	})
})

describe('applyQueryParam', () => {
	it('adds a param', () => {
		expect(applyQueryParam('/smart-fish', 'species', 'atlantic-salmon')).toBe(
			'/smart-fish?species=atlantic-salmon',
		)
	})

	it('updates an existing param', () => {
		expect(
			applyQueryParam('/smart-fish?species=brook-trout', 'species', 'atlantic-salmon'),
		).toBe('/smart-fish?species=atlantic-salmon')
	})

	it('removes a param when value is null', () => {
		expect(applyQueryParam('/smart-fish?species=brook-trout', 'species', null)).toBe(
			'/smart-fish',
		)
	})
})

describe('applyPathname', () => {
	it('changes pathname and keeps search params', () => {
		expect(
			applyPathname('/smart-fish?species=brook-trout', '/regulations/chaleur/jacquet-river'),
		).toBe('/regulations/chaleur/jacquet-river?species=brook-trout')
	})
})

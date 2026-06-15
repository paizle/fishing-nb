import { describe, expect, it } from 'vitest'
import { POPULAR_TAGS, popularTagHref, speciesSearchHref } from './popularTags'

describe('species search links', () => {
	it('uses display name for species grid links', () => {
		expect(speciesSearchHref('Smallmouth Bass')).toBe('/search?q=Smallmouth+Bass&scope=species')
	})

	it('uses display name for popular species chips', () => {
		const bass = POPULAR_TAGS.find((tag) => tag.label === 'Smallmouth Bass')
		expect(bass).toBeDefined()
		expect(popularTagHref(bass!)).toBe('/search?q=Smallmouth+Bass&scope=species')
	})
})

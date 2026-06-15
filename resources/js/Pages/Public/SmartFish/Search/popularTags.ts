import { buildRegulationUrl, buildSearchUrl } from './searchHelpers'
export type PopularTag = {
	label: string
	type: 'region' | 'water' | 'species'
	regionSlug?: string
	waterSlug?: string
}

/** Curated popular tags with verified slugs from the regulation database. */
export const POPULAR_TAGS: PopularTag[] = [
	{
		label: 'Miramichi River',
		type: 'water',
		regionSlug: 'miramichi',
		waterSlug: 'miramichi-river',
	},
	{ label: 'Grand Lake', type: 'water', regionSlug: 'lower-saint-john', waterSlug: 'grand-lake' },
	{ label: 'Brook Trout', type: 'species' },
	{ label: 'Smallmouth Bass', type: 'species' },
	{ label: 'Chaleur', type: 'region', regionSlug: 'chaleur' },
	{ label: 'Miramichi', type: 'region', regionSlug: 'miramichi' },
]

export function popularTagHref(tag: PopularTag): string {
	if (tag.type === 'region' && tag.regionSlug) {
		return buildRegulationUrl({ regionSlug: tag.regionSlug })
	}

	if (tag.type === 'water' && tag.regionSlug && tag.waterSlug) {
		return buildRegulationUrl({
			regionSlug: tag.regionSlug,
			waterSlug: tag.waterSlug,
		})
	}

	if (tag.type === 'species') {
		return buildSearchUrl(tag.label, 'species')
	}

	return '/search'
}

export function speciesSearchHref(speciesName: string): string {
	return buildSearchUrl(speciesName, 'species')
}

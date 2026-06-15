import { applyQueryParam } from '@/Hooks/useQueryParam'

export type SearchResult = {
	type: 'region' | 'water' | 'speciesLocation'
	regionSlug: string
	regionName: string
	waterSlug?: string | null
	waterName?: string | null
	speciesSlug?: string | null
	speciesName?: string | null
	label: string
}

export type SearchScope = 'all' | 'waterbody' | 'species' | 'region'

export const SEARCH_SCOPES: SearchScope[] = ['all', 'waterbody', 'species', 'region']

export const SEARCH_SCOPE_LABELS: Record<SearchScope, string> = {
	all: 'Search All',
	waterbody: 'Waterbody',
	species: 'Species',
	region: 'Region',
}

export function scopeFromTabIndex(index: number): SearchScope {
	return SEARCH_SCOPES[index] ?? 'all'
}

export function tabIndexFromScope(scope: SearchScope | string | null): number {
	const idx = SEARCH_SCOPES.indexOf((scope ?? 'all') as SearchScope)
	return idx >= 0 ? idx : 0
}

export function buildRegulationUrl(
	result: Pick<SearchResult, 'regionSlug' | 'waterSlug' | 'speciesSlug'>,
): string {
	const path = result.waterSlug
		? `/fish/${result.regionSlug}/${result.waterSlug}`
		: `/fish/${result.regionSlug}`

	if (result.speciesSlug) {
		return applyQueryParam(path, 'species', result.speciesSlug)
	}

	return path
}

export function buildSearchUrl(query: string, scope: SearchScope): string {
	const params = new URLSearchParams()
	params.set('q', query.trim())
	params.set('scope', scope)
	return `/search?${params.toString()}`
}

export function resultTypeLabel(type: SearchResult['type'], speciesName?: string | null): string {
	if (type === 'region') {
		return 'Region'
	}

	if (type === 'water') {
		return 'Waterbody'
	}

	return speciesName ?? 'Species'
}

export function groupResultsByType(results: SearchResult[]): Record<string, SearchResult[]> {
	const groups: Record<string, SearchResult[]> = {
		Regions: [],
		Waterbodies: [],
		'Species by location': [],
	}

	for (const result of results) {
		if (result.type === 'region') {
			groups.Regions.push(result)
		} else if (result.type === 'water') {
			groups.Waterbodies.push(result)
		} else {
			groups['Species by location'].push(result)
		}
	}

	return groups
}

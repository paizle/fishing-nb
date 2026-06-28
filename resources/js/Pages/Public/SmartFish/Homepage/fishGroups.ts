import fishGroupsConfig from '@/data/fish_groups.json'

type FishGroupsConfig = {
	groups: Record<
		string,
		{
			display_name: string
			members: string[]
			status_merge: string
		}
	>
	featured: Array<
		{ group: string } | { species: string } | { display_name: string; match_names: string[] }
	>
}

const config = fishGroupsConfig as FishGroupsConfig

export type FeaturedDisplayConfig = {
	displayName: string
	matchNames: readonly string[]
}

export function featuredDisplay(): FeaturedDisplayConfig[] {
	const rows: FeaturedDisplayConfig[] = []

	for (const entry of config.featured) {
		if ('group' in entry) {
			const group = config.groups[entry.group]
			if (!group) {
				continue
			}
			rows.push({
				displayName: group.display_name,
				matchNames: group.members,
			})
			continue
		}

		if ('species' in entry) {
			rows.push({
				displayName: entry.species,
				matchNames: [entry.species],
			})
			continue
		}

		if ('match_names' in entry && 'display_name' in entry) {
			rows.push({
				displayName: entry.display_name,
				matchNames: entry.match_names,
			})
		}
	}

	return rows
}

export const FEATURED_DISPLAY = featuredDisplay()

import parseMySqlDate from '@/Util/parseMySqlDate'
import { compareAsc } from 'date-fns'

export interface FishingRestriction {
	id: Number
	seasonStart: Date
	seasonEnd: Date
	bagLimit: Number
	hookLimit: Number
	minSize: String
	maxSize: String
	fishingMethod: String
	tidal: String
	water: String
	watersCategory: String
	boundary: String
	waterDescription: String
	note: String
}

export interface FishRestrictionGroup extends FishingRestriction {
	group: Array<FishingRestriction>
}

export interface FishRestrictions {
	restrictions: Array<FishRestrictionGroup>
}

interface FishRestrictionMap {
	[key: string]: FishRestrictions
}

class Fish {
	constructor(row: any) {
		Object.assign(this, Fish.convertToFishingRestriction(row))
	}
	static convertToFishingRestriction(row: any): FishingRestriction {
		return {
			id: row.id,
			seasonStart: parseMySqlDate(row.season_start),
			seasonEnd: parseMySqlDate(row.season_end),
			bagLimit: row.bag_limit,
			hookLimit: row.hook_release_limit,
			minSize: row.minimum_size,
			maxSize: row.maximum_size,
			water: row?.water?.name ?? '',
			fishingMethod: row?.method || '',
			tidal: row?.tidal || '',
			watersCategory: row?.water_type || '',
			boundary: row?.boundary || '',
			waterDescription: row.water_description ?? '',
			note: row.note,
		}
	}
	static sortBySeasonAndGenerality(restrictions: FishRestrictionGroup[]) {
		return restrictions.sort((a, b) => {
			let startComparison = null
			if (!startComparison && a.fishingMethod) {
				startComparison = a.fishingMethod.localeCompare(b.fishingMethod)
			}

			if (!startComparison) {
				startComparison = compareAsc(a.seasonStart, b.seasonStart)
			}

			if (!startComparison && a.boundary) {
				startComparison = b.boundary.localeCompare(a.boundary)
			}

			if (!startComparison) {
				if (a.water || a.fishingMethod || a.tidal || a.waterDescription) {
					return 1
				}
				return compareAsc(b.seasonEnd, a.seasonEnd)
			}
			return startComparison
		})
	}
	static formatFishingMethod(row: any) {
		let fishingMethod = ''

		if (
			row?.fishing_method?.name ===
			'May only be angled by artificial fly or baited barbless hook with a single point'
		) {
			fishingMethod = 'Fly Fishing'
		} else {
			fishingMethod = row?.fishing_method?.name ?? ''
		}
		return fishingMethod
	}

	static setupGroups(fish: FishRestrictionMap, groupBy: string[]) {
		Object.keys(fish).forEach((fishName: string) => {
			// create groups for restrictions with the same attributes
			const groupMap = {} as Record<string, FishRestrictionGroup>
			let i = 0
			while (i < fish[fishName].restrictions.length) {
				const limit = fish[fishName].restrictions[i]
				const key = groupBy.map((name) => limit[name]).join('-')

				if (groupMap[key]) {
					if (!groupMap[key].group) {
						groupMap[key].group = []
					}
					groupMap[key].group.push(limit)
					fish[fishName].restrictions.splice(i, 1)
				} else {
					groupMap[key] = limit
					i++
				}
			}
		})
	}

	static sortRestrictions(fish: FishRestrictionMap) {
		Object.keys(fish).forEach((fishName) => {
			fish[fishName].restrictions = Fish.sortBySeasonAndGenerality(
				fish[fishName].restrictions,
			)
		})
	}
}

export function byFish(results: any) {
	if (!results?.length) {
		return
	}

	// create map of fish name and a list of restrictions
	const fish: FishRestrictionMap = results.reduce((a, v) => {
		const fishName = v?.fish?.name ?? null
		if (!a[fishName]) {
			a[fishName] = {
				restrictions: [],
			}
		}
		a[fishName].restrictions.push(Fish.convertToFishingRestriction(v))
		return a
	}, {})

	Fish.sortRestrictions(fish)

	Fish.setupGroups(fish, [
		'fishingMethod',
		'tidal',
		'waterDescription',
		'water',
		'boundary',
		'watersCategory',
	])

	return fish
}

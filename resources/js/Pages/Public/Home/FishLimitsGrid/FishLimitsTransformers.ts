import parseMySqlDate from '@/Util/parseMySqlDate'
import { compareAsc } from 'date-fns'

enum FishingMethod {

}

enum TidalCategory {
    Tidal = 'Tidal',
    NonTidal = 'Non-Tidal'
}

interface FishSize {
    unit: String,
    measure: Number,
}

export interface FishingRestriction {
    id: Number,
    seasonStart: Date,
    seasonEnd: Date,
    bagLimit: Number,
    hookLimit: Number,
    minSize: FishSize,
    maxSize: FishSize,
    fishingMethod: String,
    tidal: String,
    water: String,
    watersCategory: String,
    boundary: String,
    waterDescription: String
}

export interface FishRestrictionGroup extends FishingRestriction {
	group: Array<FishingRestriction>
}

export interface FishRestrictions {
	limits: Array<FishRestrictionGroup>,
}

/*
class Limit implements FishingRestriction {
    constructor(record) {
            this.id = record.id,
            this.seasonStart = parseMySqlDate(record.season_start),
            this.seasonEnd = parseMySqlDate(record.season_end),
            this.bagLimit = record.bag_limit,
            this.minSize = record.minimum_size,
            this.maxSize = record.maximum_size,
            this.fishingMethod = formatFishingMethod(limit),
            this.tidal = limit?.tidal_category?.name ?? '',
            this.water = limit?.water?.name ?? '',
            this.watersCategory = limit?.waters_category?.name ?? '',
            this.boundary = limit?.boundary?.name ?? '',
            this.waterDescription = record.water_description ?? '',
        }
    }
}
*/

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
        hookLimit: row.hook_limit,
        minSize: row.minimum_size,
        maxSize: row.maximum_size,
        fishingMethod: Fish.formatFishingMethod(row),
        tidal: row?.tidal_category?.name ?? '',
        water: row?.water?.name ?? '',
        watersCategory: row?.waters_category?.name ?? '',
        boundary: row?.boundary?.name ?? '',
        waterDescription: row.water_description ?? '',
    }
	}
	static sortBySeasonAndGenerality(limits: FishRestrictionGroup[]) {
    return limits.sort((a, b) => {
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
	/** Modifies the map
	 * 
	 * @param fish 
	 * @param groupBy 
	 */
	static setupGroups(fish: FishRestrictionMap, groupBy: string[]) {
		Object.keys(fish).forEach((fishName: string) => {

			// create groups for restrictions with the same attributes
			const groupMap = {} as Record<string, FishRestrictionGroup>
			let i = 0
			while (i < fish[fishName].limits.length) {
					const limit = fish[fishName].limits[i]
					const key = groupBy.map((name) => limit[name]).join('-')
					
					if (groupMap[key]) {
							if (!groupMap[key].group) {
								groupMap[key].group = []
							}
							groupMap[key].group.push(limit)
							fish[fishName].limits.splice(i, 1)
					} else {
							groupMap[key] = limit
							i++
					}
			}
		})
	}

	static sortRestrictions(fish: FishRestrictionMap) {
		Object.keys(fish).forEach((fishName) => {
			fish[fishName].limits = Fish.sortBySeasonAndGenerality(fish[fishName].limits)
		})
	}
}

export function byFish(results: any) {
    if (!results.length) {
        return
    }

		// create map of fish name and a list of restrictions
    const fish: FishRestrictionMap = results.reduce((a, v) => {
        const fishName = v?.fish?.name ?? null
        if (!a[fishName]) {
            a[fishName] = {
                limits: [],
            }
        }
        a[fishName].limits.push(Fish.convertToFishingRestriction(v))
        return a
    }, {})

		Fish.sortRestrictions(fish)

		Fish.setupGroups(fish, [
			'fishingMethod',
			'tidal',
			'waterDescription',
			'water',
			'boundary',
			'watersCategory'
		])
    
    return fish
}

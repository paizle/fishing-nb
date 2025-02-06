import parseMySqlDate from '@/Util/parseMySqlDate'
import { isBefore, compareAsc, isEqual } from 'date-fns'
export function transform(data) {
    return null
}

function convertLimit(limit) {
    return {
        id: limit.id,
        seasonStart: parseMySqlDate(limit.season_start),
        seasonEnd: parseMySqlDate(limit.season_end),
        bagLimit: limit.bag_limit,
        minSize: limit.minimum_size,
        maxSize: limit.maximum_size,
        fishingMethod: formatFishingMethod(limit),
        tidal: limit?.tidal_category?.name ?? '',
        water: limit?.water?.name ?? '',
        watersCategory: limit?.waters_category?.name ?? '',
        boundary: limit?.boundary?.name ?? '',
        waterDescription: limit.water_description ?? '',
    }
}
function formatFishingMethod(limit) {
    let fishingMethod = ''

    if (
        limit?.fishing_method?.name ===
        'May only be angled by artificial fly or baited barbless hook with a single point'
    ) {
        fishingMethod = 'Fly Fishing'
    } else {
        fishingMethod = limit?.fishing_method?.name ?? ''
    }
    return fishingMethod
}

export function removeDuplicates(limits) {
    return limits.reduce((a, v) => {
        let i = 0
        let duplicate = false
        while (!duplicate && i < a.length) {
            if (
                !a[i].waterDescription &&
                isEqual(v.seasonStart, a[i].seasonStart) &&
                isEqual(v.seasonEnd, a[i].seasonEnd) &&
                v.bagLimit === a[i].bagLimit &&
                v.minimumSize === a[i].minimumSize &&
                v.maximumSize === a[i].maximumSize
            ) {
                duplicate = true
                if (v.fishingMethod !== a[i].fishingMethod) {
                    a[i].fishingMethod = ''
                }
                if (v.tidal !== a[i].tidal) {
                    a[i].tidal = ''
                }
            }
            i++
        }
        if (!duplicate) {
            a.push(v)
        }
        return a
    }, [])
}


export function sortBySeasonAndGenerality(limits) {
    return limits.sort((a, b) => {
        const startComparison = compareAsc(a.seasonStart, b.seasonStart)
        if (startComparison === 0) {
            if (a.water || a.fishingMethod || a.tidal || a.waterDescription) {
                return 1
            }
            return compareAsc(b.seasonEnd, a.seasonEnd)
        }
        return startComparison
    })
}

export function formatResults(results) {
    if (!results.length) {
        return
    }

    const fish = results.reduce((a, v) => {
        const fishName = v?.fish?.name ?? null
        if (!a[fishName]) {
            const entry = {
                limits: [],
            }
            a[fishName] = entry
        }
        a[fishName].limits.push(convertLimit(v))
        return a
    }, {})

    Object.keys(fish).forEach((fishName) => {

        fish[fishName].limits = sortBySeasonAndGenerality(fish[fishName].limits)

        // create groups for limits with the same water description, fishing method, tidal category, etc.
        const objectMap = {}
        let i = 0
        while (i < fish[fishName].limits.length) {
            const obj = fish[fishName].limits[i]
            const key = [
                obj.fishingMethod,
                obj.tidal,
                obj.waterDescription,
                obj.water,
                obj.border,
                obj.watersCategory
            ].join('-')

            if (objectMap[key] && true) {
                if (!objectMap[key].group) {
                    objectMap[key].group = []
                }
                objectMap[key].group.push(obj)
                fish[fishName].limits.splice(i, 1)
            } else {
                objectMap[key] = obj
                i++
            }
        }
    })

    return fish
}

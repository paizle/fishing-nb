import parseMySqlDate from '@/Util/parseMySqlDate'
import { isBefore, compareAsc, isEqual } from 'date-fns'
export function transform(data) {
	return null
}

function convertLimit(limit) {
	return {
		seasonStart: parseMySqlDate(limit.season_start),
		seasonEnd: parseMySqlDate(limit.season_end),
		bagLimit: limit.bag_limit,
		hookLimit: limit.hook_release_limit,
		minSize: limit.minimum_size,
		maxSize: limit.maximum_size,
		fishingMethod: formatFishingMethod(limit),
		note: limit.note,
		tidal: formatTidal(limit),
		water: limit?.water?.name ?? '',
		waterDescription: limit.water_description ?? '',
	}
}
function formatFishingMethod(limit) {
	let fishingMethod = ''

	if (
		limit?.method?.name ===
		'May only be angled by artificial fly or baited barbless hook with a single point'
	) {
		fishingMethod = 'Fly Fishing'
	} else {
		fishingMethod = limit?.method?.name ?? ''
	}
	return fishingMethod
}

function formatTidal(limit) {
	let text = ''
	if (limit.tidal) {
		if (text) {
			text += ' in '
		}
		text += limit.tidal + ' waters'
	}
	return text
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

export function sortByStartAndEndDate(limits) {
	return limits.sort((a, b) => {
		const startComparison = compareAsc(a.seasonStart, b.seasonStart)
		if (startComparison === 0) {
			if (b.fishingMethod || b.tidal || b.waterDescription) {
				return -1
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
				seasonStart: null,
				seasonEnd: null,
				limits: [],
			}
			a[fishName] = entry
		}
		a[fishName].limits.push(convertLimit(v))
		return a
	}, {})

	Object.keys(fish).forEach((fishName) => {
		fish[fishName].limits = removeDuplicates(fish[fishName].limits)

		// sort by start date and end date
		fish[fishName].limits = sortByStartAndEndDate(fish[fishName].limits)

		// calculate season date based on earliest start and latest end dates
		fish[fishName].limits.forEach((limit) => {
			if (limit.bagLimit) {
				if (!fish[fishName].seasonStart) {
					fish[fishName].seasonStart = limit.seasonStart
				} else {
					if (isBefore(limit.seasonStart, fish[fishName].seasonStart)) {
						fish[fishName].seasonStart = limit.seasonStart
					}
				}
				if (!fish[fishName].seasonEnd) {
					fish[fishName].seasonEnd = limit.seasonEnd
				} else {
					if (!isBefore(limit.seasonEnd, fish[fishName].seasonEnd)) {
						fish[fishName].seasonEnd = limit.seasonEnd
					}
				}
			}
		})

		// create groups for limits with the same water description/fishing method/tidal category
		const objectMap = {}
		let i = 0
		while (i < fish[fishName].limits.length) {
			const obj = fish[fishName].limits[i]
			const key = [obj.fishingMethod, obj.tidal, obj.waterDescription].join('-')

			if (obj.waterDescription && objectMap[key] && true) {
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

import {
	formatResults,
	sortByStartAndEndDate,
	removeDuplicates,
} from '../Water/WaterTransformers'

export default function transformLimits(limits) {
	limits = removeDuplicates(limits)
	limits = sortByStartAndEndDate(limits)

	return groupByRegion(limits)
}

export function groupByRegion(limits) {
	const locations = limits.reduce((a, v) => {
		const location = v.location.name
		if (!a.hasOwnProperty(location)) {
			a[location] = []
		}
		a[location].push(v)
		return a
	}, {})

	return locations
}

function groupLimits(limits) {
	// create groups for limits with the same water description/fishing method/tidal category
	const objectMap = {}
	let i = 0
	while (i < limits.length) {
		const obj = limits[i]
		const key = [
			obj?.water?.name,
			obj?.fishing_method?.name,
			obj?.boundary?.name,
			obj?.tidal_category?.name,
			obj?.waters_category?.name,
			obj?.waterDescription,
		].join('-')

		if (objectMap[key] && true) {
			if (!objectMap[key].group) {
				objectMap[key].group = []
			}
			objectMap[key].group.push(obj)
			limits.splice(i, 1)
		} else {
			objectMap[key] = obj
			i++
		}
	}
	return limits
}

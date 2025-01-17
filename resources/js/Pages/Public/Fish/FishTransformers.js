import { formatResults, sortByStartAndEndDate, removeDuplicates } from '../Water/WaterTransformers'

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


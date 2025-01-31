import { formatResults, sortByStartAndEndDate, removeDuplicates } from '../Water/WaterTransformers'

export default function transformLimits(limits) {

    limits = removeDuplicates(limits)
    limits = sortByStartAndEndDate(limits)

    return groupByRegion(limits)
}

export function groupByRegion(limits) {

    const regions = limits.reduce((a, v) => {
        const region = v.region.name
        if (!a.hasOwnProperty(region)) {
            a[region] = []
        }
        a[region].push(v)
        return a
    }, {})

    return regions

}

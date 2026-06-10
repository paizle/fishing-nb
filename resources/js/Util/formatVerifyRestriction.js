import { format } from 'date-fns'
import config from '@/Util/config'

function capitalize(text) {
	if (!text) {
		return ''
	}
	return text.charAt(0).toUpperCase() + text.slice(1)
}

function formatDateRange(restriction, isMobile) {
	if (!restriction.seasonStart || !restriction.seasonEnd) {
		return null
	}

	const dateFormat = isMobile ? config.displayDayMonthShortFormat : config.displayDayMonthFormat
	const start = format(restriction.seasonStart, dateFormat)
	const end = format(restriction.seasonEnd, dateFormat)

	return `${start} - ${end}`
}

function formatBagLimit(restriction) {
	if (restriction.bagLimit === null) {
		return '∞'
	}

	return String(restriction.bagLimit)
}

function formatWaterContext(restriction) {
	const locationParts = []

	if (restriction.boundary) {
		locationParts.push(restriction.boundary)
	}

	if (restriction.watersCategory && !restriction.water) {
		locationParts.push(restriction.watersCategory)
	}

	if (restriction.water) {
		locationParts.push(restriction.water)
	}

	if (restriction.waterDescription) {
		locationParts.push(restriction.waterDescription)
	}

	let text = locationParts.join(' ')

	if (restriction.tidal) {
		if (restriction.water || restriction.watersCategory || restriction.boundary) {
			text = `${restriction.tidal} portions of ${text}`
		} else {
			text = `${restriction.tidal} waters`
		}
	}

	if (restriction.fishingMethod) {
		text = text ? `${restriction.fishingMethod} in ${text}` : restriction.fishingMethod
	}

	text = capitalize(text.trim())

	return text || null
}

function formatLimits(restriction, isMobile) {
	return [
		{ label: 'Bag Limit', value: formatBagLimit(restriction) },
		{
			label: isMobile ? 'Min. Size' : 'Minimum Size',
			value: restriction.minSize ?? 'N/A',
		},
		{
			label: isMobile ? 'Max. Size' : 'Maximum Size',
			value: restriction.maxSize ?? 'N/A',
		},
	]
}

function formatHeadline(fishName, regionName) {
	if (fishName && regionName) {
		return `${fishName} - ${regionName}`
	}

	return fishName || regionName || null
}

export function formatVerifyRestriction({ restriction, fishName, regionName, isMobile }) {
	const water = formatWaterContext(restriction)
	const headline = formatHeadline(fishName, regionName)

	if (restriction.isException) {
		return {
			headline,
			date: null,
			water,
			limits: null,
		}
	}

	return {
		headline,
		date: formatDateRange(restriction, isMobile),
		water,
		limits: formatLimits(restriction, isMobile),
	}
}

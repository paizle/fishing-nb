import { format } from 'date-fns'
import config from '@/Util/config'
import { normalizeExportText } from '@/Util/normalizeExportText'

function normalizeOptional(value) {
	return normalizeExportText(value) ?? ''
}

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

function formatWaterContext(restriction) {
	const locationParts = []

	if (restriction.boundary) {
		locationParts.push(normalizeOptional(restriction.boundary))
	}

	if (restriction.watersCategory && !restriction.water) {
		locationParts.push(normalizeOptional(restriction.watersCategory))
	}

	if (restriction.water) {
		locationParts.push(normalizeOptional(restriction.water))
	}

	if (restriction.waterDescription) {
		locationParts.push(normalizeOptional(restriction.waterDescription))
	}

	let text = locationParts.join(' ')

	if (restriction.tidal) {
		if (restriction.water || restriction.watersCategory || restriction.boundary) {
			text = `${normalizeOptional(restriction.tidal)} portions of ${text}`
		} else {
			text = `${normalizeOptional(restriction.tidal)} waters`
		}
	}

	if (restriction.fishingMethod) {
		const method = normalizeOptional(restriction.fishingMethod)
		text = text ? `${method} in ${text}` : method
	}

	text = capitalize(text.trim())

	return text || null
}

function formatLimits(restriction, isMobile) {
	const limits = []

	if (restriction.bagLimit != null) {
		limits.push({ label: 'Bag Limit', value: String(restriction.bagLimit) })
	}

	if (restriction.minSize != null && restriction.minSize !== '') {
		limits.push({
			label: isMobile ? 'Min. Size' : 'Minimum Size',
			value: restriction.minSize,
		})
	}

	if (restriction.maxSize != null && restriction.maxSize !== '') {
		limits.push({
			label: isMobile ? 'Max. Size' : 'Maximum Size',
			value: restriction.maxSize,
		})
	}

	return limits.length > 0 ? limits : null
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

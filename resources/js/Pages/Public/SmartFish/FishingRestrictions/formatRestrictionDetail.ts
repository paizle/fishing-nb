export type RestrictionDetailSource = {
	tidal?: string
	boundary?: string
	watersCategory?: string
	water?: string
	fishingMethod?: string
	waterDescription?: string
}

function uppercaseFirst(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1)
}

export function formatRestrictionDetail(
	source: RestrictionDetailSource,
	onWaterPage = false,
): string {
	const water = onWaterPage ? '' : (source.water ?? '')
	const watersCategory = onWaterPage ? '' : (source.watersCategory ?? '')
	let text = ''

	if (source.tidal) {
		text += source.tidal
		if (water || watersCategory || source.boundary) {
			text += ' portions of '
		} else {
			text += ' waters'
		}
	}

	if (source.boundary) {
		text += source.boundary
	}

	if (!water && watersCategory) {
		if (source.boundary) {
			text += ' of '
		}
		text += watersCategory
	}

	if (water) {
		if (watersCategory) {
			text += text ? ' in ' : ''
		} else if (source.boundary) {
			text += ' of '
		}
		text += water
	}

	if (source.fishingMethod) {
		text = text ? source.fishingMethod + ' in ' + text : source.fishingMethod
	}

	if (source.waterDescription) {
		text += text ? ' ' : ''
		text += source.waterDescription
	}

	if (!text) {
		return ''
	}

	return ' ' + uppercaseFirst(text)
}

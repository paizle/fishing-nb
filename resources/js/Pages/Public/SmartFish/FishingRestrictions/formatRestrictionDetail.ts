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

export function formatRestrictionDetail(source: RestrictionDetailSource): string {
	let text = ''

	if (source.tidal) {
		text += source.tidal
		if (source.water || source.watersCategory || source.boundary) {
			text += ' portions of '
		} else {
			text += ' waters'
		}
	}

	if (source.boundary) {
		text += source.boundary
	}

	if (!source.water && source.watersCategory) {
		if (source.boundary) {
			text += ' of '
		}
		text += source.watersCategory
	}

	if (source.water) {
		if (source.watersCategory) {
			text += text ? ' in ' : ''
		} else if (source.boundary) {
			text += ' of '
		}
		text += source.water
	}

	if (source.fishingMethod) {
		text = source.fishingMethod + ' in ' + text
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

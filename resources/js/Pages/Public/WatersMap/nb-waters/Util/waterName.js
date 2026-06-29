function escapeHtml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

/**
 * @returns {{ text?: string, label?: string, value?: string }}
 */
export function getWaterDisplay(item) {
	const name = item?.name?.trim()
	if (name) return { text: name }

	const nid = item?.nid != null ? String(item.nid).trim() : ''
	if (nid) return { label: 'NID', value: nid }

	return { text: 'Unknown water' }
}

/** Plain text for inputs, aria labels, and Leaflet tooltips. */
export function formatWaterName(item) {
	const display = getWaterDisplay(item)
	if (display.text != null) return display.text
	if (display.label) return `${display.label}: ${display.value}`
	return display.value ?? ''
}

/** Markup for popups and rich UI. */
export function formatWaterNameHtml(item) {
	const display = getWaterDisplay(item)
	if (display.text != null) return escapeHtml(display.text)
	if (display.label) {
		return (
			`<span class="water-id">` +
			`<span class="water-id-label">${escapeHtml(display.label)}:</span> ` +
			`<span class="water-id-value">${escapeHtml(display.value)}</span>` +
			`</span>`
		)
	}
	return `<span class="water-id"><span class="water-id-value">${escapeHtml(display.value)}</span></span>`
}

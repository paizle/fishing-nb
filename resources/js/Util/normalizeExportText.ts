/** Mirror data_miner fishnb.text_normalize for display-layer fixes (PDF mojibake). */
export function normalizeExportText(value: unknown): string | null {
	if (value == null) {
		return null
	}

	let text = String(value)
	text = text.replace(/\u2019/g, "'").replace(/\u2018/g, "'")
	text = text.replace(/\u201d/g, '"').replace(/\u201c/g, '"')
	text = text.replace(/\u00a0/g, ' ')
	text = text.replace(/\s+/g, ' ').trim()

	if (!text) {
		return null
	}

	text = text.replace(/\?\?\?/g, "'")
	text = text.replace(/(?<=\d)\?\?(?=\d|'|\s|")/g, '°')
	text = text.replace(/(?<=[A-Za-z])\?\?(?=\s|[A-Za-z])/g, 'é')
	text = text.replace(/\?\?/g, '°')

	return text || null
}

const ROW_REF_SEPARATORS = [' — ', ' ??? ', ' - ']

export function parseSourceLocation(location) {
	if (!location) {
		return { table: '', row: '' }
	}

	let separatorIndex = -1
	let separatorLength = 0

	for (const separator of ROW_REF_SEPARATORS) {
		const index = location.lastIndexOf(separator)
		if (index > separatorIndex) {
			separatorIndex = index
			separatorLength = separator.length
		}
	}

	if (separatorIndex < 0) {
		return { table: location.trim(), row: '' }
	}

	return {
		table: location.slice(0, separatorIndex).trim(),
		row: location.slice(separatorIndex + separatorLength).trim(),
	}
}

// Stored source_page is the PDF file index; footer page numbers are 2 less.
export const PAGE_DISPLAY_OFFSET = 2

export function displayPageNumber(page) {
	return Number(page) - PAGE_DISPLAY_OFFSET
}

export function formatVerifyDescription(page, location, regionName = '') {
	const { table, row } = parseSourceLocation(location)
	const section = row ? `${table} - ${row}` : table
	const parts = [`Page ${displayPageNumber(page)}`]

	if (regionName) {
		parts.push(regionName)
	}

	parts.push(section)

	return parts.join(' - ')
}

export function buildVerifySourceUrl(page, location, regionName = '') {
	const params = new URLSearchParams({
		page: String(page),
		location,
	})

	if (regionName) {
		params.set('region', regionName)
	}

	return `/verify-source?${params}`
}

export function hasSourceCitation(restriction) {
	return !!(restriction?.sourcePage && restriction?.sourceLocation)
}

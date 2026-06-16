const ROW_REF_SEPARATOR = ' - '

/** Reuse the same browser tab when opening verify-source from the modal. */
export const VERIFY_SOURCE_WINDOW = 'fishnb-verify-source'

export function joinSourceTableRow(table, row) {
	if (!table) {
		return ''
	}
	if (!row) {
		return table
	}
	return `${table}${ROW_REF_SEPARATOR}${row}`
}

// Stored source_page is the PDF file index; footer page numbers are 2 less.
export const PAGE_DISPLAY_OFFSET = 2

export function displayPageNumber(page) {
	return Number(page) - PAGE_DISPLAY_OFFSET
}

export function formatVerifyDescription(page, table, row, regionName = '') {
	const section = joinSourceTableRow(table, row)
	const parts = [`Page ${displayPageNumber(page)}`]

	if (regionName) {
		parts.push(regionName)
	}

	if (section) {
		parts.push(section)
	}

	return parts.join(' - ')
}

export function buildVerifySourceUrl(page, table, row, regionName = '') {
	const params = new URLSearchParams({
		page: String(page),
		table,
	})

	if (row) {
		params.set('row', row)
	}

	if (regionName) {
		params.set('region', regionName)
	}

	return `/verify-source?${params}`
}

export function hasSourceCitation(restriction) {
	return !!(restriction?.sourcePage && restriction?.sourceTable)
}

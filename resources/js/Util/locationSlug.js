/**
 * Match Laravel Str::slug() for ASCII region/water names.
 */
export default function locationSlug(name) {
	if (!name) {
		return ''
	}

	return name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

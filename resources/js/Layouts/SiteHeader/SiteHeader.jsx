import { usePage } from '@inertiajs/react'

/** Server-rendered redesign nav (same partial as Blade pages). */
export default function SiteHeader() {
	const { siteHeader } = usePage().props

	if (!siteHeader) {
		return null
	}

	return <header className="SiteHeader" dangerouslySetInnerHTML={{ __html: siteHeader }} />
}

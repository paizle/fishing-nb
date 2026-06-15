import { useCallback, useEffect, useState } from 'react'

export const URL_CHANGE_EVENT = 'fishnb:urlchange'

function notifyUrlChange() {
	window.dispatchEvent(new Event(URL_CHANGE_EVENT))
}

/** Pure URL helper — set or delete one query param; returns pathname + search. */
export function applyQueryParam(href: string, key: string, value: string | null): string {
	const url = new URL(href, 'http://localhost')
	if (value === null || value === '') {
		url.searchParams.delete(key)
	} else {
		url.searchParams.set(key, value)
	}
	return url.pathname + url.search
}

/** Pure URL helper — change pathname; preserves existing query params. */
export function applyPathname(href: string, pathname: string): string {
	const url = new URL(href, 'http://localhost')
	url.pathname = pathname
	return url.pathname + url.search
}

export function readQueryParamFromSearch(search: string, key: string): string | null {
	return new URLSearchParams(search).get(key)
}

/** Update pathname without an Inertia visit; keeps query string and notifies hook subscribers. */
export function replacePathname(pathname: string) {
	const next = applyPathname(window.location.href, pathname)
	window.history.replaceState(window.history.state, '', next)
	notifyUrlChange()
}

export default function useQueryParam(
	key: string,
): [string | null, (value: string | null) => void] {
	const [, bump] = useState(0)

	useEffect(() => {
		const onChange = () => bump((n) => n + 1)
		window.addEventListener('popstate', onChange)
		window.addEventListener(URL_CHANGE_EVENT, onChange)
		return () => {
			window.removeEventListener('popstate', onChange)
			window.removeEventListener(URL_CHANGE_EVENT, onChange)
		}
	}, [])

	const value = readQueryParamFromSearch(window.location.search, key)

	const setValue = useCallback(
		(next: string | null) => {
			const nextUrl = applyQueryParam(window.location.href, key, next)
			window.history.replaceState(window.history.state, '', nextUrl)
			notifyUrlChange()
		},
		[key],
	)

	return [value, setValue]
}

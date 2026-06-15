import { useCallback, useEffect, useState } from 'react'
import { LinkIcon } from '@heroicons/react/24/outline'
import { URL_CHANGE_EVENT } from '@/Hooks/useQueryParam'
import './SharePageLink.scss'

async function copyToClipboard(text) {
	try {
		await navigator.clipboard.writeText(text)
		return true
	} catch {
		const textarea = document.createElement('textarea')
		textarea.value = text
		textarea.setAttribute('readonly', '')
		textarea.style.position = 'absolute'
		textarea.style.left = '-9999px'
		document.body.appendChild(textarea)
		textarea.select()
		const ok = document.execCommand('copy')
		document.body.removeChild(textarea)
		return ok
	}
}

export default function SharePageLink({ className = '' }) {
	const [pageUrl, setPageUrl] = useState(() => window.location.href)
	const [revealed, setRevealed] = useState(false)
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		const syncUrl = () => setPageUrl(window.location.href)
		window.addEventListener('popstate', syncUrl)
		window.addEventListener(URL_CHANGE_EVENT, syncUrl)
		return () => {
			window.removeEventListener('popstate', syncUrl)
			window.removeEventListener(URL_CHANGE_EVENT, syncUrl)
		}
	}, [])

	const share = useCallback(async () => {
		const href = window.location.href
		setPageUrl(href)
		setRevealed(true)
		await copyToClipboard(href)
		setCopied(true)
		window.setTimeout(() => setCopied(false), 2200)
	}, [])

	return (
		<div
			className={`SharePageLink ${className} ${revealed ? 'is-revealed' : ''} ${copied ? 'is-copied' : ''}`}
		>
			<button
				type="button"
				className="share-trigger"
				onClick={share}
				aria-label="Share this page"
			>
				<span className="share-icon" aria-hidden="true">
					<LinkIcon />
				</span>
				<span className="share-label">Share this page</span>
			</button>

			{copied ? (
				<div className="share-toast" role="status">
					Link Copied!
				</div>
			) : null}

			<div className="share-url" aria-live="polite">
				<span className="share-url-text">{pageUrl}</span>
			</div>
		</div>
	)
}

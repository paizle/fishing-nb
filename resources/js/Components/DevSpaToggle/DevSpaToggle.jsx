import './DevSpaToggle.scss'
import { useEffect, useState } from 'react'
import { applyShowSpa, getShowSpa, hasStaticPageShell, setShowSpa } from '@/devSpaToggle'

const SYNC_EVENT = 'fishnb-dev-spa-toggle'

export default function DevSpaToggle({ enabled }) {
	const [showSpa, setShowSpaState] = useState(getShowSpa)

	useEffect(() => {
		if (!enabled || !hasStaticPageShell()) {
			return
		}

		const sync = () => {
			const next = getShowSpa()
			setShowSpaState(next)
			applyShowSpa(next)
		}

		sync()
		window.addEventListener(SYNC_EVENT, sync)

		return () => {
			window.removeEventListener(SYNC_EVENT, sync)
		}
	}, [enabled])

	if (!enabled || !hasStaticPageShell() || !showSpa) {
		return null
	}

	return (
		<label className="dev-spa-toggle" id="dev-spa-toggle-react">
			<input
				type="checkbox"
				checked={showSpa}
				onChange={(event) => {
					const next = event.target.checked
					setShowSpaState(next)
					setShowSpa(next)
				}}
			/>
			Show SPA
		</label>
	)
}

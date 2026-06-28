/** localStorage key for the dev-only SPA / prerender toggle. */
export const DEV_SPA_STORAGE_KEY = 'fishnb-dev-show-spa'

/** Default: show the React SPA when JavaScript is available. */
export function getShowSpa() {
	return localStorage.getItem(DEV_SPA_STORAGE_KEY) !== 'false'
}

export function setShowSpa(showSpa) {
	localStorage.setItem(DEV_SPA_STORAGE_KEY, showSpa ? 'true' : 'false')
	applyShowSpa(showSpa)
	window.dispatchEvent(new CustomEvent('fishnb-dev-spa-toggle'))
}

/** Show React (#app) or server prerender chrome (.static-site-chrome). */
export function applyShowSpa(showSpa) {
	document.querySelectorAll('.static-site-chrome').forEach((el) => {
		el.hidden = showSpa
	})

	const app = document.getElementById('app')
	if (app) {
		app.hidden = !showSpa
	}

	const staticToggle = document.getElementById('dev-spa-toggle-static')
	if (staticToggle) {
		staticToggle.hidden = showSpa
		const input = staticToggle.querySelector('input[type="checkbox"]')
		if (input) {
			input.checked = showSpa
		}
	}
}

export function hasStaticPageShell() {
	return document.querySelector('.static-site-chrome') !== null
}

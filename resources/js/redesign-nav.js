const OPEN_CLASS = 'RedesignNav--open'

function getNav() {
	return document.querySelector('.RedesignNav')
}

function isMenuOpen(nav = getNav()) {
	return nav?.classList.contains(OPEN_CLASS) ?? false
}

function setMenuOpen(open, nav = getNav()) {
	if (!nav) {
		return
	}

	nav.classList.toggle(OPEN_CLASS, open)
	document.body.classList.toggle('RedesignNav-menuOpen', open)

	const menuBtn = nav.querySelector('[data-redesign-nav-toggle]')
	if (menuBtn) {
		menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false')
		menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
	}
}

function toggleMenu(nav = getNav()) {
	setMenuOpen(!isMenuOpen(nav), nav)
}

function initRedesignNav() {
	document.addEventListener('click', (event) => {
		const menuBtn = event.target.closest('[data-redesign-nav-toggle]')
		if (menuBtn) {
			event.preventDefault()
			toggleMenu(menuBtn.closest('.RedesignNav'))
			return
		}

		const mobileLink = event.target.closest('.RedesignNav-mobileLink')
		if (mobileLink) {
			setMenuOpen(false)
			return
		}

		const nav = getNav()
		if (!isMenuOpen(nav)) {
			return
		}

		const inMenuSurface = event.target.closest('.RedesignNav-inner, .RedesignNav-mobile')
		if (!inMenuSurface) {
			setMenuOpen(false)
		}
	})

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			setMenuOpen(false)
		}
	})
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initRedesignNav)
} else {
	initRedesignNav()
}

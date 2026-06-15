import './RedesignNav.scss'
import { Link } from '@inertiajs/react'
import { useState } from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

const NAV_LINKS = [
	{ label: 'Waters Map', href: 'maps.waters', type: 'route' },
	{ label: 'Regulations', href: '#find-regulations', type: 'anchor' },
	{ label: 'Species', href: '#species', type: 'anchor' },
	{ label: 'Search', href: '#find-regulations', type: 'anchor' },
	{ label: 'About', href: '#about', type: 'anchor' },
	{ label: 'Resources', href: '#resources', type: 'anchor' },
]

function NavLink({ link, className, onClick }) {
	if (link.type === 'route') {
		return (
			<Link href={route(link.href)} className={className} onClick={onClick}>
				{link.label}
			</Link>
		)
	}

	return (
		<a href={link.href} className={className} onClick={onClick}>
			{link.label}
		</a>
	)
}

export default function RedesignNav() {
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<nav className="RedesignNav" aria-label="Main navigation">
			<div className="RedesignNav-inner">
				<Link href={route('smart_fish.page')} className="RedesignNav-brand">
					<img
						src="/images/redesign/logo.png"
						alt=""
						className="RedesignNav-logo"
						width={40}
						height={40}
					/>
					<div className="RedesignNav-brandText">
						<span className="RedesignNav-title">Smart Fish</span>
						<span className="RedesignNav-tagline">
							New Brunswick Fishing Regulations
						</span>
					</div>
				</Link>

				<div className="RedesignNav-links RedesignNav-links--desktop">
					{NAV_LINKS.map((link) => (
						<NavLink key={link.label} link={link} className="RedesignNav-link" />
					))}
					<Link
						href={route('settings.edit')}
						className="RedesignNav-settings"
						aria-label="Settings"
					>
						<Cog6ToothIcon aria-hidden="true" />
					</Link>
				</div>

				<button
					type="button"
					className="RedesignNav-menuBtn"
					aria-label={menuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen((open) => !open)}
				>
					<span className={`RedesignNav-menuIcon ${menuOpen ? 'is-open' : ''}`} />
				</button>
			</div>

			{menuOpen && (
				<div className="RedesignNav-mobile">
					{NAV_LINKS.map((link) => (
						<NavLink
							key={link.label}
							link={link}
							className="RedesignNav-mobileLink"
							onClick={() => setMenuOpen(false)}
						/>
					))}
					<Link
						href={route('settings.edit')}
						className="RedesignNav-mobileLink"
						onClick={() => setMenuOpen(false)}
					>
						Settings
					</Link>
				</div>
			)}
		</nav>
	)
}

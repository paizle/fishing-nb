import './RedesignLayout.scss'
import { Head } from '@inertiajs/react'
import RedesignNav from './RedesignNav'
import PublicFooter from './PublicFooter'

export default function RedesignLayout({ children, title }) {
	return (
		<div className="RedesignLayout">
			{title ? <Head title={title} /> : null}
			<header className="RedesignLayout-header">
				<RedesignNav />
			</header>
			<main className="RedesignLayout-main">{children}</main>
			<footer className="RedesignLayout-footer">
				<PublicFooter />
			</footer>
		</div>
	)
}

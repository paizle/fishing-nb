import './RedesignLayout.scss'
import RedesignNav from './RedesignNav'
import PublicFooter from './PublicFooter'

export default function RedesignLayout({ children }) {
	return (
		<div className="RedesignLayout">
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

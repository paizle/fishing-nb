import './Index.scss'
import { useLayoutEffect } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import useApplicationContext from '@/Contexts/ApplicationContext'

export default function Index() {
	const app = useApplicationContext()

	useLayoutEffect(() => {
		const landingPage = app.getLandingPage()

		switch (landingPage) {
			case 'location':
				window.location.href = route('location.map')
				break
			default:
				window.location.href = route('home.home')
				break
		}
	}, [])

	return (
		<PublicLayout>
			<header></header>
			<main>
				<div className="flex h-full w-full items-center justify-center">
					<img src="/images/logo.png" />
				</div>
			</main>
		</PublicLayout>
	)
}

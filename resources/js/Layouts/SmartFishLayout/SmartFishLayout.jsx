import './SmartFishLayout.scss'
import { useState, useEffect } from 'react'
import useApplicationContext from '@/Contexts/ApplicationContext'
import PublicLayout from '../PublicLayout/PublicLayout'
import PublicNav from '../PublicLayout/PublicNav'
import SelectFishDesktop from '@/Pages/Public/Home/SelectFishDesktop/SelectFishDesktop'
import SelectFishMobile from '@/Pages/Public/Home/SelectFishMobile/SelectFishMobile'
import useRest from '@/Hooks/useRest'

export default function SmartFishLayout({
	apiLastModified,
	selectedLocation,
	selectedFish,
	selectFish,
	children,
}) {
	const [fishes, setFishes] = useState(null)

	const appContext = useApplicationContext()

	const restFish = useRest(apiLastModified)

	useEffect(() => {
		restFish.get('/api/fishes').then((request) => setFishes(request.data.fishes))
	}, [])

	return (
		<PublicLayout className={`SmartFishLayout ${selectedLocation ? 'sub-heading' : ''}`}>
			<header>
				<PublicNav>
					<h1 className="hero">
						Smart <span>Fish</span>
					</h1>
				</PublicNav>
			</header>
			<main>{children}</main>
			<footer>
				{appContext.screenOrientation.isMobile ? (
					<SelectFishMobile
						fishes={fishes}
						selectedFishId={selectedFish}
						selectFish={selectFish}
					/>
				) : (
					<SelectFishDesktop
						fishes={fishes}
						selectedFishId={selectedFish}
						selectFish={selectFish}
					/>
				)}
			</footer>
		</PublicLayout>
	)
}

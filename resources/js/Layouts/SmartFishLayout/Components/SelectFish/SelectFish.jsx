import { useState, useEffect } from 'react'
import useApplicationContext from '@/Contexts/ApplicationContext'
import SelectFishDesktop from '@/Layouts/SmartFishLayout/Components/SelectFish/SelectFishDesktop/SelectFishDesktop'
import SelectFishMobile from '@/Layouts/SmartFishLayout/Components/SelectFish/SelectFishMobile/SelectFishMobile'
import useRest from '@/Hooks/useRest'

export default function SelectFish({
	apiLastModified,
	selectedLocation,
	selectedFish,
	selectFish,
}) {
	const appContext = useApplicationContext()
	const [fishes, setFishes] = useState(null)
	const restFish = useRest(apiLastModified)

	useEffect(() => {
		if (!fishes) {
			restFish.get('/api/fishes').then((request) => {
				setFishes(appContext.setFishes(request.data.fishes))
			})
		} else {
			setFishes(appContext.getFishes())
		}
	}, [])

	return appContext.screenOrientation.isMobile ? (
		<SelectFishMobile fishes={fishes} selectedFishId={selectedFish} selectFish={selectFish} />
	) : (
		<SelectFishDesktop fishes={fishes} selectedFishId={selectedFish} selectFish={selectFish} />
	)
}

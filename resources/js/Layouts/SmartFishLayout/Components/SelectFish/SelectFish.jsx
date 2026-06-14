import { useState, useEffect } from 'react'
import useApplicationContext from '@/Contexts/ApplicationContext'
import SelectFishDesktop from '@/Layouts/SmartFishLayout/Components/SelectFish/SelectFishDesktop/SelectFishDesktop'
import SelectFishMobile from '@/Layouts/SmartFishLayout/Components/SelectFish/SelectFishMobile/SelectFishMobile'
import useRest from '@/Hooks/useRest'
import normalizeFishId from '@/Util/normalizeFishId'

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
		let cancelled = false

		restFish.get('/api/fishes').then((request) => {
			if (cancelled) {
				return
			}
			const map = appContext.setFishes(request.data.fishes)
			setFishes(map)

			const selectedId = normalizeFishId(selectedFish ?? appContext.getUserSelectedFish())
			if (selectedId !== null && !map[selectedId]) {
				selectFish(null)
			}
		})

		return () => {
			cancelled = true
		}
	}, [apiLastModified])

	return appContext.screenOrientation.isMobile ? (
		<SelectFishMobile fishes={fishes} selectedFishId={selectedFish} selectFish={selectFish} />
	) : (
		<SelectFishDesktop fishes={fishes} selectedFishId={selectedFish} selectFish={selectFish} />
	)
}

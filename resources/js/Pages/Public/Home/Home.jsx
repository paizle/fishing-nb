import './Home.scss'
import { useState, useEffect, useRef, memo, useMemo } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import LocationCombobox from '@/Pages/Public/Home/LocationCombobox/LocationCombobox'
import useRest from '@/Hooks/useRest'
import useLandingPage from '@/Hooks/useLandingPage'
import SelectFishMobile from './SelectFishMobile/SelectFishMobile'
import SelectFishDesktop from './SelectFishDesktop/SelectFishDesktop'
import FishingRestrictions from './FishingRestrictions/FishingRestrictions'
import useApplicationContext from '@/Contexts/ApplicationContext'
import SelectedLocationButton from './SelectedLocationButton/SelectedLocationButton'

export default function Home({ apiLastModified }) {
	const [fishes, setFishes] = useState(null)
	const [locations, setLocations] = useState(null)
	const [restrictions, setRestrictions] = useState(null)
	const [selectedFish, setSelectedFish] = useState(null)
	const [selectedLocation, setSelectedLocation] = useState(null)

	const comboboxRef = useRef(null)

	const appContext = useApplicationContext()
	appContext.setLandingPage('home')

	const restFish = useRest(apiLastModified)
	const restLocations = useRest(apiLastModified)
	const restRestrictions = useRest(apiLastModified)

	useEffect(() => {
		restFish.get('/api/fishes').then((request) => setFishes(request.data.fishes))
		restLocations.get('/api/locations').then((request) => setLocations(request.data.locations))
	}, [])

	useEffect(() => {
		const selectedFish = appContext.getUserSelectedFish()
		if (selectedFish) {
			setSelectedFish(selectedFish)
		}
	}, [])

	useEffect(() => {
		if (selectedLocation) {
			setRestrictions(null)
			let url = '/api/fishByLocation/' + selectedLocation.value.regionId
			url += '/' + (selectedLocation.value?.waterId ?? 0)
			url += '/' + (selectedFish ?? 0)

			restRestrictions.get(url).then((request) => {
				setRestrictions(request.data.limits)
			})
		}
	}, [selectedLocation, selectedFish])

	const selectFish = (id) => {
		let newSelectedFish
		if (selectedFish === id) {
			newSelectedFish = null
		} else {
			newSelectedFish = id
		}
		appContext.setUserSelectedFish(newSelectedFish)
		setSelectedFish(newSelectedFish)
	}

	const clearLocation = () => {
		setSelectedLocation(null)
		setTimeout(() => {
			comboboxRef.current.click()
		}, 10)
	}

	const selectLocation = (selectedLocation) => {
		setSelectedLocation(selectedLocation)
	}

	return (
		<PublicLayout className={`Home ${selectedLocation ? 'sub-heading' : ''}`}>
			<header>
				<PublicNav>
					<h1 className="hero">
						Smart <span>Fish</span>
					</h1>
				</PublicNav>
			</header>
			<main>
				{fishes !== null && locations !== null && (
					<div className="focused-layout">
						<div className="header">
							{selectedLocation && (
								<SelectedLocationButton
									selectedLocation={selectedLocation}
									onClick={clearLocation}
								/>
							)}
						</div>
						<div className="body">
							{!selectedLocation ? null : (
								<FishingRestrictions
									isLoading={restRestrictions.state.loading}
									restrictions={restrictions}
									regionId={selectedLocation?.value?.regionId}
									waterId={selectedLocation?.value?.waterId}
								/>
							)}

							<LocationCombobox
								className={selectedLocation ? 'hidden' : ''}
								inputRef={comboboxRef}
								locations={locations}
								onChange={selectLocation}
							/>
						</div>
					</div>
				)}

				<div className="logo">
					<img src="/images/logo.png" />
				</div>
			</main>
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

import './Home.scss'
import { useState, useEffect, useRef, memo, useMemo, lazy, Suspense } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import LocationCombobox from '@/Pages/Public/Home/LocationCombobox/LocationCombobox'
import useRest from '@/Hooks/useRest'
import useLandingPage from '@/Hooks/useLandingPage'
import SelectFishMobile from '../../../Layouts/SmartFishLayout/Components/SelectFish/SelectFishMobile/SelectFishMobile'
import SelectFishDesktop from '../../../Layouts/SmartFishLayout/Components/SelectFish/SelectFishDesktop/SelectFishDesktop'
import FishingRestrictions from './FishingRestrictions/FishingRestrictions'
import useApplicationContext from '@/Contexts/ApplicationContext'
import SelectedLocationButton from './SelectedLocationButton/SelectedLocationButton'
import SmartFishLayout from '@/Layouts/SmartFishLayout/SmartFishLayout'
import normalizeFishId from '@/Util/normalizeFishId'

import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'

const Map = lazy(() => import('./Map/Map.jsx'))

export default function Home({ apiLastModified }) {
	const [locations, setLocations] = useState(null)
	const [restrictions, setRestrictions] = useState(null)
	const [selectedFish, setSelectedFish] = useState(null)
	const [selectedLocation, setSelectedLocation] = useState(null)
	const [selectedRegion, setSelectedRegion] = useState(null)
	const [showMap, setShowMap] = useState(false)

	const comboboxRef = useRef(null)

	const appContext = useApplicationContext()
	appContext.setLandingPage('home')

	const restFish = useRest(apiLastModified)
	const restLocations = useRest(apiLastModified)
	const restRestrictions = useRest(apiLastModified)

	useEffect(() => {
		setSelectedRegion(appContext.getUserSelectedRegion())
	}, [])

	const selectRegion = (regionId) => {
		appContext.setUserSelectedRegion(regionId)
		setSelectedRegion(regionId)
		setShowMap(false)
	}

	useEffect(() => {
		restLocations.get('/api/locations').then((request) => setLocations(request.data.locations))
	}, [])

	useEffect(() => {
		const storedFish = normalizeFishId(appContext.getUserSelectedFish())
		if (storedFish !== null) {
			setSelectedFish(storedFish)
		}
	}, [])

	useEffect(() => {
		if (selectedLocation) {
			setRestrictions(null)
			let url = '/api/fishByLocation/' + selectedLocation.value.regionId
			url += '/' + (selectedLocation.value?.waterId ?? 0)
			url += '/' + (normalizeFishId(selectedFish) ?? 0)

			restRestrictions.get(url).then((request) => {
				setRestrictions(request.data.limits)
			})
		}
	}, [selectedLocation, selectedFish])

	const selectFish = (id) => {
		const fishId = normalizeFishId(id)
		const currentId = normalizeFishId(selectedFish)
		const newSelectedFish = fishId !== null && fishId === currentId ? null : fishId
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
		<SmartFishLayout
			apiLastModified={apiLastModified}
			selectedLocation={selectedLocation}
			selectedFish={selectedFish}
			selectFish={selectFish}
		>
			{showMap && (
				<Suspense
					fallback={
						<div className="loading">
							<LoadingSpinner />
						</div>
					}
				>
					<Map
						apiLastModified={apiLastModified}
						locations={locations}
						selectRegion={selectRegion}
						setShowMap={setShowMap}
					/>
				</Suspense>
			)}

			{!showMap && locations !== null && (
				<>
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
									regionName={selectedLocation?.value?.regionName}
								/>
							)}

							<LocationCombobox
								className={selectedLocation ? 'hidden' : ''}
								inputRef={comboboxRef}
								locations={locations}
								selectedRegion={selectedRegion}
								selectRegion={selectRegion}
								onChange={selectLocation}
								setShowMap={setShowMap}
							/>
						</div>
					</div>

					<div className="logo">
						<img src="/images/logo.png" />
					</div>
				</>
			)}
		</SmartFishLayout>
	)
}

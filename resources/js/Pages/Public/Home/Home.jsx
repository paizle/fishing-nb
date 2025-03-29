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
import SmartFishLayout from '@/Layouts/SmartFishLayout/SmartFishLayout'

export default function Home({ apiLastModified }) {
	const [locations, setLocations] = useState(null)
	const [restrictions, setRestrictions] = useState(null)
	const [selectedFish, setSelectedFish] = useState(null)
	const [selectedLocation, setSelectedLocation] = useState(null)
	const [selectedRegion, setSelectedRegion] = useState(null)

	const comboboxRef = useRef(null)

	const appContext = useApplicationContext()
	appContext.setLandingPage('home')

	const restFish = useRest(apiLastModified)
	const restLocations = useRest(apiLastModified)
	const restRestrictions = useRest(apiLastModified)

	useState(() => {
		setSelectedRegion(appContext.getUserSelectedRegion())
	}, [])

	const selectRegion = (regionId) => {
		appContext.setUserSelectedRegion(regionId)
		setSelectedRegion(regionId)
	}

	useEffect(() => {
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
		<SmartFishLayout
			selectedLocation={selectedLocation}
			selectedFish={selectedFish}
			selectFish={selectFish}
		>
			{locations !== null && (
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
							selectedRegion={selectedRegion}
							selectRegion={selectRegion}
							onChange={selectLocation}
						/>
					</div>
				</div>
			)}
			<div className="logo">
				<img src="/images/logo.png" />
			</div>
		</SmartFishLayout>
	)
}

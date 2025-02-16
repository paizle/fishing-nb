import './Home.scss'
import { useState, useEffect, useRef } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'
import Combobox from '@/Components/Combobox/Combobox'
import { XCircleIcon } from '@heroicons/react/24/outline'
import useRest from '@/Hooks/useRest'
import useLandingPage from '@/Hooks/useLandingPage'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import SelectFishMobile from './SelectFishMobile/SelectFishMobile'
import SelectFishDesktop from './SelectFishDesktop/SelectFishDesktop'
import FishingRestrictions from './FishingRestrictions/FishingRestrictions'

export default function Home() {
	const [fishes, setFishes] = useState(null)
	const [locations, setLocations] = useState(null)
	const [restrictions, setRestrictions] = useState([])
	const [selectedFish, setSelectedFish] = useState(null)
	const [selectedLocation, setSelectedLocation] = useState(null)

	const storage = useLocalStorageDefaults()
	useLandingPage('home')

	const screenOrientation = useScreenOrientation()

	const restFish = useRest()
	const restLocations = useRest()
	const restRestrictions = useRest()

	useEffect(() => {
		restFish
			.get('/api/fishes')
			.then((request) => setFishes(request.data.fishes))
		restLocations
			.get('/api/locations?v=2')
			.then((request) => setLocations(request.data.locations))
	}, [])

	useEffect(() => {
		const selectedFish = storage.get(
			'settings',
			(settings) => settings.selectedFish,
		)
		if (selectedFish) {
			setSelectedFish(selectedFish)
		}
	}, [])

	const selectFish = (id) => {
		let newSelectedFish
		if (selectedFish === id) {
			newSelectedFish = null
		} else {
			newSelectedFish = id
		}
		storage.set(
			'settings',
			(settings) => (settings.selectedFish = newSelectedFish),
		)
		setSelectedFish(newSelectedFish)
	}

	const handleLocationChange = (location) => {
		setSelectedLocation(location)
	}

	useEffect(() => {
		if (selectedLocation) {
			setRestrictions([])
			let url = '/api/fishByLocation/' + (selectedLocation.value.regionId || selectedLocation.value.locationId)
			url += '/' + (selectedLocation.value?.waterId ?? 0)
			url += '/' + (selectedFish ?? 0)

			restRestrictions.get(url).then((request) => {
				setRestrictions(request.data.limits)
			})
		}
	}, [selectedLocation, selectedFish])

	const handleLocationFocus = (e) => {
		const target = e.target
		const combobox = target.closest('.Combobox')
		combobox.addEventListener(
			'transitionstart',
			() =>
				combobox.addEventListener(
					'transitionend',
					() =>
						target.parentElement?.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						}),
					{ once: true },
				),
			{ once: true },
		)
	}

	return (
		<PublicLayout
			className={`Home ${selectedLocation ? 'location-selected' : ''}`}
		>
			<header>
				<PublicNav>
					<h1 className="hero">
						Smart <span>Fish</span>
					</h1>
				</PublicNav>
			</header>
			<main>
				{fishes !== null && locations !== null && (
					<div className="layout">
						<div className="header">
							{selectedLocation && (
								<button
									onClick={() => setSelectedLocation(null)}
									className="selected-location flex items-center gap-2"
								>
									<strong>
										{selectedLocation.label
											.split('/')
											.map((part) => (
												<span key={part}>{part}</span>
											))}
									</strong>
									<XCircleIcon className="h-5 w-5" />
								</button>
							)}
						</div>
						<div className="body">
							{selectedLocation ? (
								<FishingRestrictions
									restrictions={restrictions}
									regionId={selectedLocation?.value?.regionId}
									waterId={selectedLocation?.value?.waterId}
								/>
							) : (
								<Combobox
									items={Object.keys(locations).map(
										(key) => ({
											value: locations[key],
											label: key,
										}),
									)}
									onChange={handleLocationChange}
									onFocus={handleLocationFocus}
									placeholder="Search by river, lake or region"
								/>
							)}
						</div>
					</div>
				)}

				<div className="logo">
					<img src="/images/logo.png" />
				</div>
			</main>
			<footer>
				{screenOrientation.isMobile ? (
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

import './Home.scss'
import { useState, useEffect, useRef, memo, useMemo } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import Combobox from '@/Components/Combobox/Combobox'
import { XCircleIcon } from '@heroicons/react/24/outline'
import useRest from '@/Hooks/useRest'
import useLandingPage from '@/Hooks/useLandingPage'
import SelectFishMobile from './SelectFishMobile/SelectFishMobile'
import SelectFishDesktop from './SelectFishDesktop/SelectFishDesktop'
import FishingRestrictions from './FishingRestrictions/FishingRestrictions'
import useApplicationContext from '@/Contexts/ApplicationContext'

export default function Home({ apiLastModified }) {
	const [fishes, setFishes] = useState(null)
	const [locations, setLocations] = useState(null)
	const [restrictions, setRestrictions] = useState(null)
	const [selectedFish, setSelectedFish] = useState(null)
	const [selectedLocation, setSelectedLocation] = useState(null)

	const appContext = useApplicationContext()
	const { screenOrientation } = appContext

	appContext.setLandingPage('home')

	const restFish = useRest(apiLastModified)
	const restLocations = useRest(apiLastModified)
	const restRestrictions = useRest(apiLastModified)

	useEffect(() => {
		restFish.get('/api/fishes').then((request) => {
			setFishes(request.data.fishes)
		})
		restLocations.get('/api/locations').then((request) => setLocations(request.data.locations))
	}, [])

	useEffect(() => {
		const selectedFish = appContext.getUserSelectedFish()
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
		appContext.setUserSelectedFish(newSelectedFish)
		setSelectedFish(newSelectedFish)
	}

	const handleLocationChange = (location) => {
		setSelectedLocation(location)
	}

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

	const PublicNavMemo = memo(PublicNav)

	const comboboxLocationItems = useMemo(
		() =>
			Object.entries(locations ?? {}).map(([key, value]) => ({
				value,
				label: key,
			})),
		[locations],
	)

	return (
		<PublicLayout className={`Home ${selectedLocation ? 'location-selected' : ''}`}>
			<header className={`${selectedLocation ? '' : 'shadow'}`}>
				<PublicNavMemo>
					<h1 className="hero">
						Smart <span>Fish</span>
					</h1>
				</PublicNavMemo>
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
										{selectedLocation.label.split('/').map((part) => (
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
									isLoading={restRestrictions.state.loading}
									restrictions={restrictions}
									regionId={selectedLocation?.value?.regionId}
									waterId={selectedLocation?.value?.waterId}
								/>
							) : (
								<Combobox
									items={comboboxLocationItems}
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

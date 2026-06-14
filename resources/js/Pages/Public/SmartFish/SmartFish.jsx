import './SmartFish.scss'
import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import LocationCombobox from '@/Pages/Public/SmartFish/LocationCombobox/LocationCombobox'
import useRest from '@/Hooks/useRest'
import FishingRestrictions from './FishingRestrictions/FishingRestrictions'
import useApplicationContext from '@/Contexts/ApplicationContext'
import SelectedLocationButton from './SelectedLocationButton/SelectedLocationButton'
import SmartFishLayout from '@/Layouts/SmartFishLayout/SmartFishLayout'
import normalizeFishId from '@/Util/normalizeFishId'
import locationSlug from '@/Util/locationSlug'
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'

const Map = lazy(() => import('./Map/Map.jsx'))

function buildLocationFromProps(regionId, regionName, waterId, waterName, regionSlug, waterSlug) {
	const slug = regionSlug ?? locationSlug(regionName)
	const waterSlugValue = waterSlug ?? (waterName ? locationSlug(waterName) : undefined)

	return {
		value: {
			regionId,
			regionName,
			regionSlug: slug,
			waterId: waterId ?? undefined,
			waterName: waterName ?? undefined,
			waterSlug: waterSlugValue,
		},
		label: waterName ?? regionName,
		fullName: waterName ? `${regionName}, ${waterName}` : regionName,
	}
}

function buildRulesUrl(selectedLocation, selectedFish) {
	const params = new URLSearchParams({ region: selectedLocation.value.regionSlug })
	if (selectedLocation.value.waterSlug) {
		params.set('water', selectedLocation.value.waterSlug)
	}

	const fishId = normalizeFishId(selectedFish)
	if (fishId !== null) {
		return `/api/rule/${fishId}?${params}`
	}

	return `/api/rules?${params}`
}

/** Update the address bar without an Inertia visit (keeps React state). */
function syncLocationUrl(locationItem) {
	const { regionSlug, waterSlug } = locationItem.value
	const url = waterSlug
		? route('fish.region.water', { region: regionSlug, water: waterSlug })
		: route('fish.region', { region: regionSlug })
	window.history.replaceState(window.history.state, '', url)
}

function syncRootUrl() {
	window.history.replaceState(window.history.state, '', route('smart_fish.page'))
}

export default function SmartFish({
	apiLastModified,
	regionId = null,
	waterId = null,
	regionName = null,
	waterName = null,
	regionSlug = null,
	waterSlug = null,
}) {
	const [locations, setLocations] = useState(null)
	const [fishes, setFishes] = useState(null)
	const [restrictions, setRestrictions] = useState(null)
	const [selectedFish, setSelectedFish] = useState(null)
	const [selectedLocation, setSelectedLocation] = useState(null)
	const [selectedRegion, setSelectedRegion] = useState(null)
	const [showMap, setShowMap] = useState(false)
	const [comboboxFocusRequest, setComboboxFocusRequest] = useState(0)
	const [restrictionsLoading, setRestrictionsLoading] = useState(false)

	const comboboxRef = useRef(null)

	const appContext = useApplicationContext()
	const rest = useRest(apiLastModified)
	const regionsByName = appContext.getRegionsByName()

	useEffect(() => {
		appContext.setLandingPage('smartFish')
	}, [])

	useEffect(() => {
		if (regionId !== null && regionName) {
			const location = buildLocationFromProps(
				regionId,
				regionName,
				waterId,
				waterName,
				regionSlug,
				waterSlug,
			)
			setSelectedLocation(location)
			setSelectedRegion(regionId)
		} else {
			setSelectedLocation(null)
			setSelectedRegion(appContext.getUserSelectedRegion())
		}
	}, [regionId, waterId, regionName, waterName, regionSlug, waterSlug])

	useEffect(() => {
		let cancelled = false

		rest.get('/api/locations').then((request) => {
			if (!cancelled && request?.data?.locations) {
				setLocations(request.data.locations)
			}
		})

		return () => {
			cancelled = true
		}
	}, [])

	useEffect(() => {
		let cancelled = false

		rest.get('/api/fishes').then((request) => {
			if (cancelled || !request?.data?.fishes) {
				return
			}

			const map = appContext.setFishes(request.data.fishes)
			setFishes(map)

			const selectedId = normalizeFishId(selectedFish ?? appContext.getUserSelectedFish())
			if (selectedId !== null && !map[selectedId]) {
				setSelectedFish(null)
				appContext.setUserSelectedFish(null)
			}
		})

		return () => {
			cancelled = true
		}
	}, [apiLastModified])

	useEffect(() => {
		const storedFish = normalizeFishId(appContext.getUserSelectedFish())
		if (storedFish !== null) {
			setSelectedFish(storedFish)
		}
	}, [])

	useEffect(() => {
		appContext.setRegions(null)
	}, [apiLastModified])

	useEffect(() => {
		if (appContext.getRegionsByName()) {
			return
		}

		let cancelled = false

		rest.get('/api/regions').then((request) => {
			if (!cancelled && request?.data?.regions) {
				appContext.setRegions(request.data.regions)
			}
		})

		return () => {
			cancelled = true
		}
	}, [apiLastModified])

	useEffect(() => {
		if (!selectedLocation?.value?.regionSlug) {
			return
		}

		let cancelled = false
		setRestrictions(null)
		setRestrictionsLoading(true)

		rest.get(buildRulesUrl(selectedLocation, selectedFish))
			.then((request) => {
				if (!cancelled && request?.data?.limits) {
					setRestrictions(request.data.limits)
				}
			})
			.finally(() => {
				if (!cancelled) {
					setRestrictionsLoading(false)
				}
			})

		return () => {
			cancelled = true
		}
	}, [selectedLocation, selectedFish])

	const visitLocation = (locationItem) => {
		syncLocationUrl(locationItem)
	}

	const selectRegion = (regionId, regionName) => {
		if (regionId === null || regionId === undefined) {
			appContext.setUserSelectedRegion(null)
			setSelectedRegion(null)
			setShowMap(false)
			return
		}

		const id = normalizeFishId(regionId)
		appContext.setUserSelectedRegion(id)
		setSelectedRegion(id)
		setShowMap(false)
		syncLocationUrl({
			value: { regionSlug: locationSlug(regionName) },
		})
	}

	const selectFish = (id) => {
		const fishId = normalizeFishId(id)
		const currentId = normalizeFishId(selectedFish)
		const newSelectedFish = fishId !== null && fishId === currentId ? null : fishId
		appContext.setUserSelectedFish(newSelectedFish)
		setSelectedFish(newSelectedFish)
	}

	const clearLocation = () => {
		setSelectedLocation(null)
		syncRootUrl()
		setComboboxFocusRequest((count) => count + 1)
	}

	const selectLocation = (locationItem) => {
		setSelectedLocation(locationItem)
		visitLocation(locationItem)
	}

	return (
		<SmartFishLayout
			fishes={fishes}
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
					{regionsByName ? (
						<Map regionsByName={regionsByName} selectRegion={selectRegion} />
					) : (
						<div className="loading">
							<LoadingSpinner />
						</div>
					)}
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
									isLoading={restrictionsLoading}
									restrictions={restrictions}
									regionId={selectedLocation?.value?.regionId}
									waterId={selectedLocation?.value?.waterId}
									regionName={selectedLocation?.value?.regionName}
								/>
							)}

							<LocationCombobox
								className={selectedLocation ? 'hidden' : ''}
								inputRef={comboboxRef}
								focusRequest={comboboxFocusRequest}
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

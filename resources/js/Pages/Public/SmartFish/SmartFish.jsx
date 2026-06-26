import './SmartFish.scss'
import { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react'
import { Head } from '@inertiajs/react'
import LocationCombobox from '@/Pages/Public/SmartFish/LocationCombobox/LocationCombobox'
import useRest from '@/Hooks/useRest'
import useQueryParam, { replacePathname } from '@/Hooks/useQueryParam'
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

function buildRulesUrl(selectedLocation, selectedFishId) {
	const params = new URLSearchParams({ region: selectedLocation.value.regionSlug })
	if (selectedLocation.value.waterSlug) {
		params.set('water', selectedLocation.value.waterSlug)
	}

	const fishId = normalizeFishId(selectedFishId)
	if (fishId !== null) {
		return `/api/rule/${fishId}?${params}`
	}

	return `/api/rules?${params}`
}

function fishIdFromSpeciesSlug(fishes, speciesSlug) {
	if (!fishes || !speciesSlug) {
		return null
	}

	for (const fish of Object.values(fishes)) {
		if (locationSlug(fish.name) === speciesSlug) {
			return fish.id
		}
	}

	return null
}

/** Update the address bar without an Inertia visit (keeps React state). */
function syncLocationUrl(locationItem) {
	const { regionSlug, waterSlug } = locationItem.value
	const path = waterSlug
		? route('fish.region.water', { region: regionSlug, water: waterSlug })
		: route('fish.region', { region: regionSlug })
	replacePathname(new URL(path, window.location.origin).pathname)
}

function syncRootUrl() {
	replacePathname(new URL(route('regulations.page'), window.location.origin).pathname)
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
	const [selectedLocation, setSelectedLocation] = useState(null)
	const [selectedRegion, setSelectedRegion] = useState(null)
	const [showMap, setShowMap] = useState(false)
	const [comboboxFocusRequest, setComboboxFocusRequest] = useState(0)
	const [restrictionsLoading, setRestrictionsLoading] = useState(false)

	const [speciesSlug, setSpeciesSlug] = useQueryParam('species')

	const comboboxRef = useRef(null)

	const appContext = useApplicationContext()
	const rest = useRest(apiLastModified)
	const regionsByName = appContext.getRegionsByName()

	const selectedFishId = useMemo(
		() => fishIdFromSpeciesSlug(fishes, speciesSlug),
		[speciesSlug, fishes],
	)

	const selectedFishName = selectedFishId != null ? (fishes?.[selectedFishId]?.name ?? '') : ''

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
			setSelectedRegion(appContext.getUserSelectedRegion())
		}
		// Hydrate from Inertia props once on load; client-side search owns selection after that.
	}, [])

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
		})

		return () => {
			cancelled = true
		}
	}, [apiLastModified])

	useEffect(() => {
		if (!fishes || !speciesSlug) {
			return
		}

		if (fishIdFromSpeciesSlug(fishes, speciesSlug) === null) {
			setSpeciesSlug(null)
		}
	}, [fishes, speciesSlug, setSpeciesSlug])

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

		rest.get(buildRulesUrl(selectedLocation, selectedFishId))
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
	}, [selectedLocation, selectedFishId])

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
		const fish = fishes?.[normalizeFishId(id)]
		if (!fish) {
			return
		}

		const slug = locationSlug(fish.name)
		setSpeciesSlug(slug === speciesSlug ? null : slug)
	}

	const clearLocation = () => {
		setSelectedLocation(null)
		syncRootUrl()
		setComboboxFocusRequest((count) => count + 1)
	}

	const selectLocation = (locationItem) => {
		setSelectedLocation({
			...locationItem,
			value: { ...locationItem.value },
		})
		visitLocation(locationItem)
	}

	const pageTitle = showMap
		? 'Map'
		: selectedLocation?.label
			? `${selectedLocation.label} Regulations`
			: 'Regulations'

	return (
		<SmartFishLayout
			fishes={fishes}
			selectedLocation={selectedLocation}
			selectedFish={selectedFishId}
			selectFish={selectFish}
		>
			<Head title={pageTitle} />
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
									selectedFishName={selectedFishName}
								/>
							)}

							<LocationCombobox
								key={comboboxFocusRequest}
								className={selectedLocation ? 'hidden' : ''}
								active={!selectedLocation}
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

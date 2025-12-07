import './Home.scss'
import { useState, useEffect, useRef, useMemo } from 'react'
import LocationCombobox from '@/Pages/Public/Home/LocationCombobox/LocationCombobox'
import useRest from '@/Hooks/useRest'
import FishingRestrictions from './FishingRestrictions/FishingRestrictions'
import useApplicationContext, { ApplicationContext } from '@/Contexts/ApplicationContext'
import SmartFishLayout from '@/Layouts/SmartFishLayout/SmartFishLayout'
import RegionButton from './RegionButton/RegionButton'

export default function HomeNew({ apiLastModified }) {
	const [locations, setLocations] = useState(null)
	const [selectedFish, setSelectedFish] = useState(null)
	const [selectedLocation, setSelectedLocation] = useState(null)

	const appContext = useApplicationContext()
	appContext.setLandingPage('home')

	const restLocations = useRest(apiLastModified)

	useEffect(() => {
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

	const selectLocation = (selectedLocation) => {
		setSelectedLocation(selectedLocation)
		if (selectedLocation) {
			if (!selectedLocation.value.waterId) {
				appContext.selectRegionName(selectedLocation.label)
			} else {
				console.log('**', selectedLocation, appContext.regions)
				const region = Object.values(appContext.regions).find(
					(region) => region.id === selectedLocation.value.regionId,
				)
				appContext.selectRegionName(region.name)
			}
		}
		appContext.setHasLocation(!!selectedLocation)
	}

	const selectRegionName = (regionName) => {
		if (appContext.selectedRegionName !== regionName) {
			setSelectedLocation(null)
			appContext.setHasLocation(false)
		}

		appContext.selectRegionName(regionName)
	}

	const wizardStepName = appContext.getWizardStep().name

	const [comboboxItems, selectedRegionItem] = useMemo(() => {
		let selected = null

		const list = (locations ?? []).map((location) => {
			const item = {
				value: {
					regionId: location.region_id,
					waterId: location.water_id ?? null,
				},
				label: location.water_id ? location.water.name : location.region.name,
				fullName: location.water_id
					? `${location.region.name}, ${location.water.name}`
					: location.region.name,
			}

			if (
				selected == null &&
				item.value.waterId === null &&
				item.label === appContext.selectedRegionName
			) {
				selected = item
			}

			return item
		})

		return [list.length > 0 ? list : null, selected]
	}, [locations, appContext.selectedRegionName])

	const unfocusCombobox = () => {
		appContext.comboboxInputRef.current.blur()
	}

	return (
		<SmartFishLayout
			shrink={
				wizardStepName === appContext.wizardSteps[1].name ||
				wizardStepName === appContext.wizardSteps[0].name
			}
			selectedLocation={selectedLocation}
			selectedFish={selectedFish}
			selectFish={selectFish}
		>
			<div className={`wizard-layout ${wizardStepName}`}>
				<div>
					<RegionButton
						regions={appContext.regions}
						zoomed={appContext.wizardState?.mapFocus}
						selectedRegionName={appContext.selectedRegionName}
						onClick={appContext.onRegionClick}
						onBlur={appContext.onRegionSelected}
						onSelect={selectRegionName}
					/>
				</div>
				<div>
					<LocationCombobox
						inputRef={appContext.comboboxInputRef}
						items={comboboxItems}
						selectedItem={selectedLocation}
						selectedRegionItem={selectedRegionItem}
						onInteract={appContext.onComboboxInteract}
						onChange={selectLocation}
						onList={appContext.onComboboxList}
						onFocus={appContext.onComboboxFocus}
						onBlur={appContext.onComboboxBlur}
					/>
				</div>
				<div>
					<FishingRestrictions
						onTouchMove={unfocusCombobox}
						selectedLocation={selectedLocation}
						selectedFish={selectedFish}
					/>
				</div>
			</div>
		</SmartFishLayout>
	)
}

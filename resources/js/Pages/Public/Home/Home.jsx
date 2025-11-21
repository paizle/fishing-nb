import './Home.scss'
import { useState, useEffect, useRef, useMemo } from 'react'
import LocationCombobox from '@/Pages/Public/Home/LocationComboboxNew/LocationCombobox'
import useRest from '@/Hooks/useRest'
import FishingRestrictions from './FishingRestrictions/FishingRestrictions'
import useApplicationContext from '@/Contexts/ApplicationContext'
import SmartFishLayout from '@/Layouts/SmartFishLayout/SmartFishLayout'
import RegionButton from './RegionButton/RegionButton'
import useWizard from '@/Hooks/useWizard'

export default function HomeNew({ apiLastModified }) {
	const [locations, setLocations] = useState(null)
	const [selectedFish, setSelectedFish] = useState(null)
	const [selectedLocation, setSelectedLocation] = useState(null)

	const appContext = useApplicationContext()
	appContext.setLandingPage('home')

	const wizard = useWizard()

	const restLocations = useRest(apiLastModified)

	const inputRef = useRef(null)

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
				wizard.selectRegionName(selectedLocation.label)
			} else {
				const region = Object.values(appContext.regions).find(
					(region) => region.id === selectedLocation.value.regionId,
				)
				wizard.selectRegionName(region.name)
			}
		}
		wizard.setHasLocation(!!selectedLocation)
	}

	const selectRegionName = (regionName) => {
		if (wizard.selectedRegionName !== regionName) {
			setSelectedLocation(null)
			wizard.setHasLocation(false)
		}

		wizard.selectRegionName(regionName)
		inputRef?.current.focus()
		inputRef?.current.click()
	}

	const wizardStepName = wizard.getWizardStep().name

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
				item.label === wizard.selectedRegionName
			) {
				selected = item
			}

			return item
		})

		return [list.length > 0 ? list : null, selected]
	}, [locations, wizard.selectedRegionName])

	return (
		<SmartFishLayout
			shrink={
				wizardStepName === wizard.wizardSteps[1].name ||
				wizardStepName === wizard.wizardSteps[0].name
			}
			wizard={wizard}
			selectedLocation={selectedLocation}
			selectedFish={selectedFish}
			selectFish={selectFish}
		>
			<div className={`wizard-layout ${wizardStepName}`}>
				<div>
					<RegionButton
						zoomed={wizard.wizardState?.mapFocus}
						selectedRegionName={wizard.selectedRegionName}
						onClick={wizard.onRegionClick}
						onBlur={wizard.onRegionSelected}
						onSelect={selectRegionName}
					/>
				</div>
				<div>
					<LocationCombobox
						inputRef={inputRef}
						items={comboboxItems}
						selectedItem={selectedLocation}
						selectedRegionItem={selectedRegionItem}
						onInteract={wizard.onComboboxInteract}
						onChange={selectLocation}
						onList={wizard.onComboboxList}
						onFocus={wizard.onComboboxFocus}
						onBlur={wizard.onComboboxBlur}
					/>
				</div>
				<div>
					<FishingRestrictions
						selectedLocation={selectedLocation}
						selectedFish={selectedFish}
					/>
				</div>
			</div>
		</SmartFishLayout>
	)
}

import './HomeNew.scss'
import { useState, useEffect } from 'react'
import LocationCombobox from '@/Pages/Public/Home/LocationCombobox/LocationCombobox'
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
	const [selectedRegionName, setSelectedRegionName] = useState(null)

	const appContext = useApplicationContext()
	appContext.setLandingPage('home')

	const wizard = useWizard()

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
				setSelectedRegionName(selectedLocation.label)
			}
		}
		wizard.setHasLocation(!!selectedLocation)
	}

	const selectRegionName = (regionName) => {
		if (selectedRegionName !== regionName) {
			setSelectedLocation(null)
			wizard.setHasLocation(false)
		}
		setSelectedRegionName(regionName)
		wizard.onRegionSelected()
	}

	const wizardStepName = wizard.getWizardStep().name

	console.log(wizard.wizardState)

	return (
		<SmartFishLayout
			wizardStepName={wizardStepName}
			shrink={
				wizardStepName === wizard.wizardSteps[1].name ||
				wizardStepName === wizard.wizardSteps[0].name
			}
			selectedLocation={selectedLocation}
			selectedFish={selectedFish}
			selectFish={selectFish}
		>
			<div className={`wizard-layout ${wizardStepName}`}>
				<div></div>
				<div>
					<RegionButton
						zoomed={wizard.wizardState?.mapFocus}
						selectedRegionName={selectedRegionName}
						onClick={wizard.onRegionClick}
						onBlur={wizard.onRegionSelected}
						onSelect={selectRegionName}
					/>
				</div>
				<div>
					<LocationCombobox
						locations={locations}
						selectedRegionName={selectedRegionName}
						selectedLocation={selectedLocation}
						onInteract={wizard.onComboboxInteract}
						onChange={selectLocation}
						onBlur={wizard.onComboboxBlur}
					/>
				</div>
				<div></div>
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

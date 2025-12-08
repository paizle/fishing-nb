import './Home.scss'
import { useState, useEffect, useRef, useMemo } from 'react'
import LocationCombobox from '@/Pages/Public/Home/LocationCombobox/LocationCombobox'
import useRest from '@/Hooks/useRest'
import FishingRestrictions from './FishingRestrictions/FishingRestrictions'
import useApplicationContext, { ApplicationContext } from '@/Contexts/ApplicationContext'
import SmartFishLayout from '@/Layouts/SmartFishLayout/SmartFishLayout'
import RegionButton from './RegionButton/RegionButton'

export default function HomeNew({ apiLastModified }) {
	const [selectedFish, setSelectedFish] = useState(null)

	const appContext = useApplicationContext()
	appContext.setLandingPage('home')

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

	const wizardStepName = appContext.getWizardStep().name

	const unfocusCombobox = () => {
		appContext.comboboxInputRef.current.blur()
	}

	return (
		<SmartFishLayout
			shrink={
				wizardStepName === appContext.wizardSteps[1].name ||
				wizardStepName === appContext.wizardSteps[0].name
			}
			selectedLocation={appContext.selectedLocation}
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
						onSelect={appContext.selectRegionName}
					/>
				</div>
				<div>
					<LocationCombobox
						items={appContext.locationItems}
						inputRef={appContext.comboboxInputRef}
						selectedItem={appContext.selectedLocationItem}
						selectedRegionItem={appContext.selectedRegionItem}
						onInteract={appContext.onComboboxInteract}
						onChange={appContext.selectLocationItem}
						onList={appContext.onComboboxList}
						onFocus={appContext.onComboboxFocus}
						onBlur={appContext.onComboboxBlur}
					/>
				</div>
				<div>
					<FishingRestrictions
						onTouchMove={unfocusCombobox}
						selectedLocation={appContext.selectedLocationItem}
						selectedFish={selectedFish}
					/>
				</div>
			</div>
		</SmartFishLayout>
	)
}

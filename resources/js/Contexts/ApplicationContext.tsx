import { createContext, useContext, useState, useEffect, useRef, ReactNode, useMemo } from 'react'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'
import useRest from '@/Hooks/useRest'

interface ApplicationData {
	fishes: Record<string, Fish>
}

// Define the type for the context value
interface ApplicationContextType {
	data: ApplicationData
	updateData: (key: string, value: any) => void
	screenOrientation: any
	getSettings: () => any
	getLandingPage: () => string
	setLandingPage: (name: string) => void
	getUserSelectedFish: () => string
	setUserSelectedFish: (fishName: string) => void
	getUserSelectedRegion: () => string
	setUserSelectedRegion: (regionName: string) => void
	setFishes: (fishes: Array<Fish>) => Record<string, Fish>
	getFishes: () => Record<string, Fish>
	getUserSelectedFishName: () => string
	regions: Record<string, Region> | null
	getRegionId: (regionName: string) => string
	wizardStep: object
	getWizardStep: () => object
	selectMap: () => void
	focusSearch: () => void
	blurSearch: () => void
	focusResults: () => void
}

interface Fish {
	id: string
	name: string
}

interface Region {
	id: string
	name: string
}

interface Settings extends Record<string, any> {}

const wizardSteps = [
	{
		name: 'wizard-step-1',
		params: {
			'': {},
		},
	},
	{
		name: 'wizard-step-2',
		params: {
			'': {},
		},
	},
	{
		name: 'wizard-step-3',
		params: {
			'': {},
		},
	},
	{
		name: 'wizard-step-4',
		params: {
			'': {},
		},
	},
]

// Create the context with an initial value of `undefined`
export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

// Provider component
export const ApplicationContextProvider = ({ children, ...rest }: { children: ReactNode }) => {
	const apiLastModified = rest.initialPage.props.apiLastModified

	const [data, setData] = useState<ApplicationData>({ fishes: {} })

	const screenOrientation = useScreenOrientation()

	const localStorage = useLocalStorageDefaults()

	const [selectedRegionName, setSelectedRegionName] = useState<string>('')

	const [regions, setRegions] = useState<Record<string, Region> | null>(null)

	const [locations, setLocations] = useState(null)
	const restLocations = useRest(apiLastModified)
	useEffect(() => {
		restLocations.get('/api/locations').then((request) => setLocations(request.data.locations))
	}, [])

	const [locationItems, locationRegionItemsByName] = useMemo(() => {
		const regionItems = {}
		const items = (locations ?? []).map((location) => {
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
			if (!item.value.waterId) {
				regionItems[item.label] = item
			}
			return item
		})

		return [items.length > 0 ? items : null, regionItems]
	}, [locations])

	const [locationItemsForSelectedRegion, selectedRegionItem] = useMemo(() => {
		let filteredItems = null
		let selectedRegionItem = null
		if (locationItems && locationRegionItemsByName) {
			selectedRegionItem = locationRegionItemsByName[selectedRegionName]

			if (selectedRegionItem) {
				filteredItems = locationItems.filter(filterByRegion(selectedRegionItem))
			} else {
				filteredItems = locationItems
			}
		}

		return [filteredItems, selectedRegionItem]
	}, [locationItems, locationRegionItemsByName, selectedRegionName])

	const [selectedLocationItem, setSelectedLocationItem] = useState(null)

	const selectLocationItem = (locationItem) => {
		setSelectedLocationItem(locationItem)
		if (locationItem && !locationItem.value.waterId) {
			selectRegionItem(locationItem)
		}
	}

	const selectRegionItem = (locationItem) => {
		if (locationItem) {
			setSelectedRegionName(locationItem.label)
		} else {
			setSelectedRegionName('')
			setSelectedLocationItem(null)
		}
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: false,
			}
			return newWizardState
		})
	}

	const selectRegionName = (regionName) => {
		setSelectedRegionName(regionName)
		setSelectedLocationItem(null)
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: false,
			}
			return newWizardState
		})
	}

	useEffect(() => {
		if (selectedRegionName && !selectedLocationItem) {
			setSelectedLocationItem(locationRegionItemsByName[selectedRegionName])
		}
	}, [selectedRegionName])

	useEffect(() => {
		axios.get('/api/regions').then((request) => {
			const regions = request.data.regions.reduce((a, v) => {
				a[v.name] = v
				return a
			}, {})
			console.log({ regions })
			setRegions(regions)
		})
	}, [])

	// Function to update global data
	const updateData = (key: string, value: any) => {
		setData((prev) => ({ ...prev, [key]: value }))
	}

	const getSettings = () => {
		return localStorage.getItem('settings')
	}
	const getLandingPage = () => {
		return localStorage.getItem('settings')?.landingPage
	}
	const setLandingPage = (name: string) => {
		localStorage.set('settings', (settings: Settings) => (settings.landingPage = name))
	}
	const getUserSelectedFish = () => {
		return localStorage.get('settings', (settings: Settings) => settings?.selectedFish)
	}
	const setUserSelectedFish = (fishName: string) => {
		localStorage.set('settings', (settings: Settings) => (settings.selectedFish = fishName))
	}
	const getUserSelectedRegion = () => {
		return localStorage.get('settings', (settings: Settings) => settings?.selectedRegion)
	}
	const setUserSelectedRegion = (regionName: string) => {
		localStorage.set('settings', (settings: Settings) => (settings.selectedRegion = regionName))
	}
	const setFishes = (fishes: Array<Fish>) => {
		const map = fishes.reduce((a, v) => {
			a[v.id] = v
			return a
		}, {})
		updateData('fishes', map)
		return map
	}
	const getFishes = () => {
		return data['fishes']
	}
	const getUserSelectedFishName = () => {
		const fishId = getUserSelectedFish()
		if (!fishId && fishId !== 0) {
			return ''
		}
		const fish = getFishes()?.[fishId]
		return fish?.name
	}

	const [wizardState, setWizardState] = useState({
		mapFocus: false,
		comboboxFocus: false,
		comboboxList: false,
	})

	const comboboxInputRef = useRef(null)

	const onDropDownClick = () => {
		console.log('drop down')
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: false,
			}
			return newWizardState
		})
	}

	const onMapClick = () => {
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: true,
			}
			return newWizardState
		})
	}

	const onRegionClick = () => {
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: true,
				//mapFocus: !oldWizardState.mapFocus,
			}
			return newWizardState
		})
	}

	const onRegionSelected = () => {
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: false,
			}
			console.log({ newWizardState })
			return newWizardState
		})
	}

	const onComboboxFocus = () => {
		console.log('wizard focus')
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				comboboxFocus: true,
			}
			return newWizardState
		})
	}

	const onComboboxList = (isOpen, hasFocus) => {
		console.log('list', { isOpen }, { hasFocus })
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				comboboxList: isOpen,
				comboboxFocus: hasFocus,
			}
			return newWizardState
		})
	}

	const onComboboxInteract = (hasFocus, isOpen) => {
		console.log('combobox interact', { hasFocus }, { isOpen })
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				comboboxFocus: hasFocus,
				comboboxList: isOpen,
			}
			if (hasFocus || isOpen) {
				console.log('unfocus map')
				newWizardState.mapFocus = false
			}
			return newWizardState
		})
	}

	const onComboboxBlur = () => {
		console.log('combobox blur')
		setWizardState((oldWizardState) => {
			const newWizardState = { ...oldWizardState, comboboxFocus: false, comboboxList: false }
			return newWizardState
		})
	}

	const getWizardStep = () => {
		let step

		if (wizardState.mapFocus) {
			step = wizardSteps[0]
		} else if (wizardState.comboboxList) {
			step = wizardSteps[2]
		} else if (selectedLocationItem) {
			step = wizardSteps[3]
		} else if (wizardState.comboboxFocus) {
			step = wizardSteps[1]
		} else {
			step = wizardSteps[1]
		}

		console.log('STATE', step.name, wizardState)

		return step
	}

	const value: ApplicationContextType = {
		screenOrientation,
		data,
		locationItems: locationItemsForSelectedRegion,
		selectedRegionItem,
		selectedLocationItem,
		selectLocationItem,
		updateData,
		getSettings,
		getLandingPage,
		setLandingPage,
		getUserSelectedFish,
		setUserSelectedFish,
		getUserSelectedRegion,
		setUserSelectedRegion,
		setFishes,
		getFishes,
		getUserSelectedFishName,
		wizardState,
		comboboxInputRef,
		onMapClick,
		onRegionClick,
		onRegionSelected,
		onComboboxInteract,
		onComboboxFocus,
		onComboboxBlur,
		onDropDownClick,
		onComboboxList,
		wizardSteps,
		getWizardStep,
		selectedRegionName,
		selectRegionName,
		regions,
	}

	return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
}

const filterByRegion = (selectedRegion) => (item) => {
	return (
		!selectedRegion ||
		(item.value.regionId === selectedRegion.value.regionId && item.value.waterId)
	)
}

export const useApplicationContext = (): ApplicationContextType => {
	const context = useContext(ApplicationContext)
	if (!context) {
		throw new Error('useApplicationContext must be used within an ApplicationContextProvider')
	}
	return context
}

export default useApplicationContext

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'

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
	console.log({ rest })

	const [data, setData] = useState<ApplicationData>({ fishes: {} })

	const screenOrientation = useScreenOrientation()

	const localStorage = useLocalStorageDefaults()

	const [regions, setRegions] = useState<Record<string, Region> | null>(null)

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

	const getRegionId = (regionName: string) => {
		debugger
		return (regions || []).filter((region) => region.name === regionName)[0].id
	}

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
	const getUserSelectedRegionId = () => {
		const regionName = getUserSelectedRegion()
		return (regions || {})[regionName]?.id
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

	const [selectedRegionName, setSelectedRegionName] = useState<string>('')

	const [wizardState, setWizardState] = useState({
		mapFocus: false,
		comboboxFocus: false,
		comboboxList: false,
		hasLocation: false,
	})

	const comboboxInputRef = useRef(null)

	const selectRegionName = (regionName: string) => {
		setSelectedRegionName(regionName)
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: false,
			}
			return newWizardState
		})
	}

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

	const setHasLocation = (hasLocation) => {
		console.log({ hasLocation })
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				hasLocation,
			}
			return newWizardState
		})
	}

	const getWizardStep = () => {
		let step

		if (wizardState.mapFocus) {
			step = wizardSteps[0]
		} else if (wizardState.comboboxList) {
			step = wizardSteps[2]
		} else if (wizardState.hasLocation) {
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
		getRegionId,
		regions,
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
		setHasLocation,
		wizardSteps,
		getWizardStep,
		selectedRegionName,
		selectRegionName,
	}

	return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
}

export const useApplicationContext = (): ApplicationContextType => {
	const context = useContext(ApplicationContext)
	if (!context) {
		throw new Error('useApplicationContext must be used within an ApplicationContextProvider')
	}
	return context
}

export default useApplicationContext

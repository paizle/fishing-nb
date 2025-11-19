import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'

import useAjax from '@/Hooks/useAjax'

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

// Create the context with an initial value of `undefined`
export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

// Provider component
export const ApplicationContextProvider = ({ children, ...rest }: { children: ReactNode }) => {
	console.log({ rest })

	const [data, setData] = useState<ApplicationData>({ fishes: {} })

	const screenOrientation = useScreenOrientation()

	const localStorage = useLocalStorageDefaults()

	const [regions, setRegions] = useState<Record<string, Region> | null>(null)

	const regionsResource = useAjax('/api/regions', (data) => {
		return data.regions.reduce((a, v) => {
			a[v.name] = v.id
			return a
		}, {})
	})

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

import { createContext, useContext, useState, ReactNode } from 'react'
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
	setUserSelectedRegion: (fishName: string) => void
	setFishes: (fishes: Array<Fish>) => Record<string, Fish>
	getFishes: () => Record<string, Fish>
	getUserSelectedFishName: () => string
}

interface Fish {
	id: string
	name: string
}

interface Settings extends Record<string, any> {}

// Create the context with an initial value of `undefined`
export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

// Provider component
export const ApplicationContextProvider = ({ children }: { children: ReactNode }) => {
	const [data, setData] = useState<ApplicationData>({ fishes: {} })

	const screenOrientation = useScreenOrientation()

	const localStorage = useLocalStorageDefaults()

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
	const setUserSelectedRegion = (regionId: string) => {
		localStorage.set('settings', (settings: Settings) => (settings.selectedRegion = regionId))
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

import { createContext, useContext, useState, ReactNode } from 'react'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import useLocalStorageDefaults from '@/Hooks/useLocalStorageDefaults'

// Define the type for the context value
interface ApplicationContextType {
	data: any
	updateData: (key: string, value: any) => void
	screenOrientation: any
	getSettings: () => any
	getLandingPage: () => string
	setLandingPage: (name: string) => void
	getUserSelectedFish: () => string
	setUserSelectedFish: (fishName: string) => void
	getUserSelectedRegion: () => string
	setUserSelectedRegion: (fishName: string) => void
}

interface Settings extends Record<string, any> {}

// Create the context with an initial value of `undefined`
export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

// Provider component
export const ApplicationContextProvider = ({ children }: { children: ReactNode }) => {
	const [data, setData] = useState({})

	const screenOrientation = useScreenOrientation()

	const localStorage = useLocalStorageDefaults()

	// Function to update global data
	const updateData = (key: string, value: any) => {
		setData((prev) => ({ ...prev, [key]: value }))
	}

	const value: ApplicationContextType = {
		data,
		updateData,
		screenOrientation,
		getSettings: () => {
			return localStorage.getItem('settings')
		},
		getLandingPage: () => {
			return localStorage.getItem('settings')?.landingPage
		},
		setLandingPage: (name) => {
			localStorage.set('settings', (settings: Settings) => (settings.landingPage = name))
		},
		getUserSelectedFish: () => {
			return localStorage.get('settings', (settings: Settings) => settings?.selectedFish)
		},
		setUserSelectedFish: (fishName) => {
			localStorage.set('settings', (settings: Settings) => (settings.selectedFish = fishName))
		},
		getUserSelectedRegion: () => {
			return localStorage.get('settings', (settings: Settings) => settings?.selectedRegion)
		},
		setUserSelectedRegion: (regionId) => {
			localStorage.set(
				'settings',
				(settings: Settings) => (settings.selectedRegion = regionId),
			)
		},
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

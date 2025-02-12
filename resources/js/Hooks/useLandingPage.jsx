import { useEffect } from 'react'
import useLocalStorageDefaults from './useLocalStorageDefaults'

export default function useLandingPage(name) {
	const storage = useLocalStorageDefaults()

	useEffect(() => {
		storage.set('settings', (settings) => (settings.landingPage = name))
	}, [])
}

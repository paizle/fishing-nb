import useLocalStorage from './useLocalStorage'

export default function useLocalStorageDefaults() {
	const localStorage = useLocalStorage()

	const defaults = {
		settings: {
			gradientBackground: true,
			landingPage: 'location',
		},
	}

	const { setItem, removeItem, clearStorage, storageChange } = localStorage

	const getItem = (key) => {
		if (defaults.hasOwnProperty(key)) {
			return Object.assign(defaults[key], localStorage.getItem(key))
		} else {
			return localStorage.getItem(key)
		}
	}

	const set = (key, setter) => {
		const value = getItem(key)
		setter(value)
		setItem(key, value)
	}

	const get = (key, getter) => {
		const value = getItem(key)
		return getter(value)
	}

	return {
		setItem,
		getItem,
		removeItem,
		clearStorage,
		storageChange,
		set,
		get,
	}
}

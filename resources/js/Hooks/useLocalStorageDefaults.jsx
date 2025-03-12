import useLocalStorage from './useLocalStorage'

export default function useLocalStorageDefaults() {
	const localStorage = useLocalStorage()

	const defaults = {
		settings: {
			gradientBackground: true,
			landingPage: 'home',
		},
	}

	const { setItem, removeItem, clearStorage, storageChange } = localStorage

	const getItem = (key, getFn) => {
		let value
		if (defaults.hasOwnProperty(key)) {
			value = Object.assign(defaults[key], localStorage.getItem(key))
		} else {
			value = localStorage.getItem(key)
		}
		if (getFn) {
			return getFn(value)
		}
		return value
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

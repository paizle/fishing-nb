import { useState, useEffect } from 'react'

export default function useLocalStorage() {
	/**
	 * Set a value in localStorage.
	 * Automatically stringifies non-primitive types.
	 */
	const setItem = (key, value) => {
		try {
			const serializedValue = JSON.stringify(value)
			localStorage.setItem(key, serializedValue)
		} catch (error) {
			console.error(`Error setting key "${key}" in localStorage:`, error)
		}
	}

	/**
	 * Get a value from localStorage.
	 * Automatically parses JSON if the stored value is serialized.
	 */
	const getItem = (key) => {
		try {
			const serializedValue = localStorage.getItem(key)
			return serializedValue ? JSON.parse(serializedValue) : null
		} catch (error) {
			console.error(
				`Error parsing key "${key}" from localStorage:`,
				error,
			)
			return null
		}
	}

	/**
	 * Remove a specific key from localStorage.
	 */
	const removeItem = (key) => {
		try {
			localStorage.removeItem(key)
		} catch (error) {
			console.error(
				`Error removing key "${key}" from localStorage:`,
				error,
			)
		}
	}

	/**
	 * Clear all items in localStorage.
	 */
	const clearStorage = () => {
		try {
			localStorage.clear()
		} catch (error) {
			console.error('Error clearing localStorage:', error)
		}
	}

	/**
	 * Subscribe to changes in localStorage.
	 * Useful for multi-tab synchronization.
	 */
	const [storageChange, setStorageChange] = useState(null)

	useEffect(() => {
		const handleStorageChange = (event) => {
			if (event.storageArea === localStorage) {
				setStorageChange({
					key: event.key,
					newValue: event.newValue
						? JSON.parse(event.newValue)
						: null,
					oldValue: event.oldValue
						? JSON.parse(event.oldValue)
						: null,
				})
			}
		}
		window.addEventListener('storage', handleStorageChange)
		return () => window.removeEventListener('storage', handleStorageChange)
	}, [])

	return { setItem, getItem, removeItem, clearStorage, storageChange }
}

import { useState, useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

export default function useLocalStorageDefaults() {
    const localStorage = useLocalStorage()

    const defaults = {
        settings: {
            gradientBackground: true,
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

    return { setItem, getItem, removeItem, clearStorage, storageChange }
}

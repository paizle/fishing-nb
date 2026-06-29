import { createContext, useContext } from 'react'

export const GpsContext = createContext(null)

export function useGps() {
	return useContext(GpsContext)
}

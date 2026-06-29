import { useCallback, useEffect, useRef, useState } from 'react'
import {
	coordsFromGeolocationPosition,
	readGpsCache,
	WATCH_OPTIONS,
	writeGpsCache,
} from '../Util/gpsSessionCache'

/**
 * Tracks the user's position via watchPosition once enabled.
 * After the first successful fix, the watch is never cleared for the session.
 */
export default function useGeolocation() {
	const isAvailable = 'geolocation' in navigator

	const [isEnabled, setIsEnabled] = useState(false)
	const [isTracking, setIsTracking] = useState(false)
	const [position, setPosition] = useState(() => readGpsCache())

	const watchIdRef = useRef(null)
	const watchErrorHandlerRef = useRef(null)
	const watchLockedRef = useRef(false)

	const recordPosition = useCallback((coords) => {
		writeGpsCache(coords)
		watchLockedRef.current = true
		setPosition({ ...readGpsCache() })
	}, [])

	const getLastPosition = useCallback(() => readGpsCache(), [])

	const applyPosition = useCallback(
		(coords) => {
			recordPosition(coords)
		},
		[recordPosition],
	)

	const setWatchErrorHandler = useCallback((handler) => {
		watchErrorHandlerRef.current = handler
	}, [])

	const startWatch = useCallback(() => {
		if (watchIdRef.current != null) return
		watchIdRef.current = navigator.geolocation.watchPosition(
			(pos) => recordPosition(coordsFromGeolocationPosition(pos)),
			(err) => watchErrorHandlerRef.current?.(err),
			WATCH_OPTIONS,
		)
	}, [recordPosition])

	useEffect(() => {
		if (!isEnabled || !isAvailable) return
		startWatch()
		return () => {
			if (watchLockedRef.current) return
			if (watchIdRef.current != null) {
				navigator.geolocation.clearWatch(watchIdRef.current)
				watchIdRef.current = null
			}
		}
	}, [isEnabled, isAvailable, startWatch])

	// Resume watch when returning with a cached fix from a prior session in this tab.
	useEffect(() => {
		if (!isAvailable || isEnabled) return
		if (!readGpsCache()) return
		setIsEnabled(true)
	}, [isAvailable, isEnabled])

	const enable = useCallback(() => {
		setIsEnabled(true)
	}, [])

	const disable = useCallback(() => {
		if (watchLockedRef.current) return
		setIsEnabled(false)
		if (watchIdRef.current != null) {
			navigator.geolocation.clearWatch(watchIdRef.current)
			watchIdRef.current = null
		}
	}, [])

	return {
		isAvailable,
		isEnabled,
		enable,
		disable,
		applyPosition,
		getLastPosition,
		setWatchErrorHandler,
		isTracking,
		setIsTracking,
		position,
	}
}

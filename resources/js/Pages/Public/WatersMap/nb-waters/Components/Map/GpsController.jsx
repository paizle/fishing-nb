import { useCallback, useEffect, useRef } from 'react'
import { useMapEvents } from 'react-leaflet'
import {
	BROWSER_CACHE_OPTIONS,
	coordsFromGeolocationPosition,
	readGpsCache,
	writeGpsCache,
} from '../../Util/gpsSessionCache'

const TRACKING_MIN_ZOOM = 13
const GOOD_ACCURACY_M = 500
const MIN_WAIT_MS = 3000
const HARD_TIMEOUT_MS = 45000
const PERMISSION_DENIED = 1

function isFixGoodEnough(coords, elapsedMs, moveStartedAt) {
	if (coords.timestamp != null && coords.timestamp < moveStartedAt - 500) return false
	if (coords.accuracy != null && coords.accuracy <= GOOD_ACCURACY_M) return true
	return elapsedMs >= MIN_WAIT_MS
}

/**
 * Lives inside MapContainer — always has a live map reference.
 * Move uses watchPosition + session cache. Drag cancels the UI wait, not the watch or cache.
 */
export default function GpsController({ geolocation, phase, onPhaseChange, onReady }) {
	const { enable, applyPosition, setWatchErrorHandler, isTracking, setIsTracking, position } =
		geolocation
	const skipPanRef = useRef(false)
	const moveStartedAtRef = useRef(0)
	const movePendingRef = useRef(false)
	const phaseRef = useRef(phase)
	const onPhaseChangeRef = useRef(onPhaseChange)
	const positionRef = useRef(position)
	const applyPositionRef = useRef(applyPosition)

	phaseRef.current = phase
	onPhaseChangeRef.current = onPhaseChange
	positionRef.current = position
	applyPositionRef.current = applyPosition

	const setPhase = useCallback((next) => {
		if (phaseRef.current === next) return
		onPhaseChangeRef.current(next)
	}, [])

	const panToLatLng = useCallback((map, lat, lng) => {
		skipPanRef.current = true
		const targetZoom = Math.max(map.getZoom(), TRACKING_MIN_ZOOM)
		map.setView([lat, lng], targetZoom, { animate: true })
		const release = () => {
			skipPanRef.current = false
		}
		map.once('moveend', release)
		map.once('zoomend', release)
		setTimeout(release, 800)
	}, [])

	const map = useMapEvents({
		dragstart() {
			if (skipPanRef.current) return
			setIsTracking(false)
			movePendingRef.current = false
			const pos = positionRef.current ?? readGpsCache()
			if (pos) writeGpsCache(pos)
			setPhase('idle')
		},
	})

	const completeMoveWithFix = useCallback(
		(coords) => {
			writeGpsCache(coords)
			applyPositionRef.current(coords)
			movePendingRef.current = false
			panToLatLng(map, coords.lat, coords.lng)
			setPhase('readyToLock')
		},
		[map, panToLatLng, setPhase],
	)

	const tryCompleteMove = useCallback(
		(coords) => {
			if (!movePendingRef.current && phaseRef.current !== 'locating') return

			writeGpsCache(coords)
			panToLatLng(map, coords.lat, coords.lng)

			const elapsed = Date.now() - moveStartedAtRef.current
			if (isFixGoodEnough(coords, elapsed, moveStartedAtRef.current)) {
				movePendingRef.current = false
				setPhase('readyToLock')
			}
		},
		[map, panToLatLng, setPhase],
	)

	// watchPosition fixes while a move is in progress.
	useEffect(() => {
		if (!position) return
		writeGpsCache(position)
		if (!movePendingRef.current && phaseRef.current !== 'locating') return
		if (moveStartedAtRef.current === 0) return
		if (position.timestamp != null && position.timestamp < moveStartedAtRef.current - 500)
			return

		tryCompleteMove(position)
	}, [phase, position, tryCompleteMove])

	// Hard timeout while locating.
	useEffect(() => {
		if (phase !== 'locating') return

		const id = setTimeout(() => {
			if (phaseRef.current !== 'locating') return
			movePendingRef.current = false
			const cached = readGpsCache()
			if (cached) {
				panToLatLng(map, cached.lat, cached.lng)
				setPhase('readyToLock')
			} else {
				setPhase('idle')
			}
		}, HARD_TIMEOUT_MS)

		return () => clearTimeout(id)
	}, [phase, map, panToLatLng, setPhase])

	// Only permission denied aborts a move; transient errors keep waiting.
	useEffect(() => {
		setWatchErrorHandler((err) => {
			if (err?.code === PERMISSION_DENIED && movePendingRef.current) {
				movePendingRef.current = false
				setPhase('idle')
			}
		})
		return () => setWatchErrorHandler(null)
	}, [setWatchErrorHandler, setPhase])

	useEffect(() => {
		onReady({
			move() {
				const cached = readGpsCache()
				if (cached) {
					completeMoveWithFix(cached)
					enable()
					return
				}

				moveStartedAtRef.current = Date.now()
				movePendingRef.current = true
				enable()

				if (!('geolocation' in navigator)) return
				navigator.geolocation.getCurrentPosition(
					(pos) => {
						if (!movePendingRef.current && phaseRef.current !== 'locating') return
						completeMoveWithFix(coordsFromGeolocationPosition(pos))
					},
					() => {},
					BROWSER_CACHE_OPTIONS,
				)
			},
			cancelMove() {
				movePendingRef.current = false
			},
			panTo(coords) {
				panToLatLng(map, coords.lat, coords.lng)
			},
		})
	}, [map, enable, onReady, panToLatLng, completeMoveWithFix])

	// While locked, follow every position update.
	useEffect(() => {
		if (!isTracking || !position || skipPanRef.current) return
		panToLatLng(map, position.lat, position.lng)
	}, [map, isTracking, position, panToLatLng])

	return null
}

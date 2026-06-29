import { useEffect, useRef } from 'react'
import { MapPinIcon, ArrowUpIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { bearing, haversineDistance } from '../../Util/coordinates'
import { formatWaterName } from '../../Util/waterName'
import WaterName from '../WaterName'
import { formatDistanceKm } from './nearestWatersUtils'
import MapControlButton from './MapControlButton'
import { useGps } from './gpsContext'

/**
 * On-map control area (top-right). Stack order:
 * 1. Selected-water indicator + cancel
 * 2. My location (first click pans; second click locks to GPS)
 *
 * GPS state and map operations are provided by GpsContext (see GpsController.jsx).
 * handleGps is synchronous — no async, no stale map closure possible.
 */
export default function MapToolbar({
	selectedItem,
	mapView,
	isTouch,
	onFocusSelected,
	onClearSelected,
}) {
	const { isAvailable, phase, isTracking, moveToUser, lockToUser, unlock } = useGps()

	const isLocating = phase === 'locating'
	const isReadyToLock = phase === 'readyToLock'

	// Clear GPS lock only when the user newly selects a water (not on every render).
	const unlockRef = useRef(unlock)
	unlockRef.current = unlock
	const prevSelectedIdRef = useRef(null)

	useEffect(() => {
		const id = selectedItem?.id ?? null
		if (id === prevSelectedIdRef.current) return
		if (id) unlockRef.current()
		prevSelectedIdRef.current = id
	}, [selectedItem?.id])

	const handleGps = () => {
		if (isTracking) {
			unlock()
			return
		}
		if (isLocating) return
		if (isReadyToLock) {
			lockToUser()
			return
		}
		moveToUser()
	}

	const handleOnFocusSelected = () => {
		onFocusSelected()
		unlock()
	}

	const bounds = mapView?.bounds
	const showIndicator = selectedItem && bounds
	const inView = showIndicator && bounds.contains([selectedItem.lat, selectedItem.lng])
	const angle = showIndicator ? bearing(bounds.getCenter(), selectedItem) : 0

	const displayName = selectedItem ? formatWaterName(selectedItem) : ''
	const distanceKm =
		showIndicator && bounds
			? formatDistanceKm(
					haversineDistance(bounds.getCenter(), {
						lat: selectedItem.lat,
						lng: selectedItem.lng,
					}),
				)
			: null

	const gpsLabel = isLocating
		? 'Locating…'
		: isTracking
			? 'Locked to my location'
			: isReadyToLock
				? 'Lock to my location'
				: 'Move to my location'

	const gpsAriaLabel = isLocating
		? 'Locating your position'
		: isTracking
			? 'Unlock from GPS'
			: 'My location'

	return (
		<div className="MapToolbar">
			{isAvailable && (
				<div className="MapToolbar-buttons">
					<MapControlButton
						icon={MapPinIcon}
						label={gpsLabel}
						active={isTracking}
						busy={isLocating}
						isTouch={isTouch}
						onAction={handleGps}
						labelPosition="left"
						actionOnFirstTap
						ariaLabel={gpsAriaLabel}
					/>
				</div>
			)}

			{showIndicator && (
				<div className="MapToolbar-selection">
					<button
						type="button"
						className="MapToolbar-pointer"
						onClick={handleOnFocusSelected}
						aria-label={inView ? `${displayName} is in view` : `Go to ${displayName}`}
					>
						{distanceKm && <span className="MapToolbar-distance">{distanceKm}</span>}
						<ArrowUpIcon
							className="MapToolbar-arrow"
							style={{ transform: `rotate(${angle}deg)` }}
						/>
						<WaterName item={selectedItem} className="MapToolbar-name" />
					</button>
					<button
						type="button"
						className="MapToolbar-cancel"
						onClick={onClearSelected}
						aria-label="Clear selected water"
					>
						<XMarkIcon />
						<span>Cancel</span>
					</button>
				</div>
			)}
		</div>
	)
}

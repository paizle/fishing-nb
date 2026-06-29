import { useEffect, useMemo, useState } from 'react'
import { formatWaterName } from '../../Util/waterName'
import { computeItemOverlay, SELECTED_OVERLAY_Z_INDEX } from './nearestWatersUtils'
import WaterDirectionLabel from './WaterDirectionLabel'

/** Direction arrow + name/distance label for the selected water. */
export default function SelectedWaterOverlay({ map, mapView, item, onFocus }) {
	const [mapTick, setMapTick] = useState(0)

	useEffect(() => {
		if (!map || !item) return
		const bump = () => setMapTick((t) => t + 1)
		map.on('move zoom', bump)
		return () => {
			map.off('move zoom', bump)
		}
	}, [map, item])

	const overlay = useMemo(() => {
		void mapTick
		if (!item) return null
		return computeItemOverlay(map, mapView, item)
	}, [item, map, mapView, mapTick])

	if (!overlay) return null

	const displayName = formatWaterName(item)

	return (
		<div className="SelectedWater-overlay" aria-hidden>
			<button
				type="button"
				className="SelectedWater-arrow"
				style={{
					left: overlay.arrowLeft,
					top: overlay.arrowTop,
					transform: `translate(-50%, -50%) rotate(${overlay.angle}deg)`,
					zIndex: SELECTED_OVERLAY_Z_INDEX,
				}}
				onClick={onFocus}
				aria-label={`Go to ${displayName}`}
			/>
			<WaterDirectionLabel
				item={item}
				distance={overlay.distance}
				className="SelectedWater-label"
				style={{
					left: overlay.nameLeft,
					top: overlay.nameTop,
					transform: 'translate(-50%, -50%)',
					zIndex: SELECTED_OVERLAY_Z_INDEX,
				}}
				onClick={onFocus}
				ariaLabel={`Go to ${displayName}`}
			/>
		</div>
	)
}

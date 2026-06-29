import { bearing, haversineDistance } from '../../Util/coordinates'

export const ARROW_RADIUS_PX = 78
export const NAME_RADIUS_PX = 128
export const SELECTED_OVERLAY_Z_INDEX = 1000

export function formatDistance(meters) {
	if (meters < 1000) return `${Math.round(meters)} m`
	return `${(meters / 1000).toFixed(1)} km`
}

/** Distance from map center to a water, always in km. */
export function formatDistanceKm(meters) {
	return `${(meters / 1000).toFixed(1)} km`
}

/** Offset from map center in container pixels along a compass bearing. */
export function offsetFromBearing(bearingDeg, radiusPx) {
	const rad = (bearingDeg * Math.PI) / 180
	return {
		x: Math.sin(rad) * radiusPx,
		y: -Math.cos(rad) * radiusPx,
	}
}

/** Arrow + label positions for one water relative to the map center. */
export function computeItemOverlay(map, mapView, item) {
	if (!map || !item || !mapView?.bounds) return null

	const center = mapView.bounds.getCenter()
	const centerPt = map.latLngToContainerPoint(center)
	const from = { lat: center.lat, lng: center.lng }
	const angle = bearing(from, item)
	const arrowOff = offsetFromBearing(angle, ARROW_RADIUS_PX)
	const nameOff = offsetFromBearing(angle, NAME_RADIUS_PX)
	const distance = item.distance ?? haversineDistance(from, item)

	return {
		item,
		angle,
		distance,
		arrowLeft: centerPt.x + arrowOff.x,
		arrowTop: centerPt.y + arrowOff.y,
		nameLeft: centerPt.x + nameOff.x,
		nameTop: centerPt.y + nameOff.y,
	}
}

export function computeNearestOverlays(map, mapView, nearest) {
	if (!map || !nearest.length) return []

	const maxDist = Math.max(...nearest.map((w) => w.distance), 1)

	return nearest
		.map((item) => computeItemOverlay(map, mapView, item))
		.filter(Boolean)
		.map((overlay) => ({
			...overlay,
			zIndex: 920 + Math.round((1 - overlay.distance / maxDist) * 79),
		}))
}

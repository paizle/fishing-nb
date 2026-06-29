/** Session GPS cache — survives disable, drag-cancel, and re-renders. */

let cached = null

export function isValidGpsCoords(coords) {
	return coords != null && Number.isFinite(coords.lat) && Number.isFinite(coords.lng)
}

export function writeGpsCache(coords) {
	if (!isValidGpsCoords(coords)) return
	cached = {
		lat: coords.lat,
		lng: coords.lng,
		accuracy: coords.accuracy,
		timestamp: coords.timestamp,
		receivedAt: coords.receivedAt ?? Date.now(),
	}
}

export function readGpsCache() {
	return isValidGpsCoords(cached) ? cached : null
}

export function coordsFromGeolocationPosition(pos) {
	return {
		lat: pos.coords.latitude,
		lng: pos.coords.longitude,
		accuracy: pos.coords.accuracy,
		timestamp: pos.timestamp,
		receivedAt: Date.now(),
	}
}

/** Accept any browser-cached fix (e.g. after a prior watch session). */
export const BROWSER_CACHE_OPTIONS = {
	enableHighAccuracy: false,
	maximumAge: Infinity,
	timeout: 8000,
}

export const WATCH_OPTIONS = {
	enableHighAccuracy: false,
	maximumAge: 60000,
	timeout: 60000,
}

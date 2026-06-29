import 'leaflet/dist/leaflet.css'
import './Map.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import useGeolocation from '../../Hooks/useGeolocation'
import { readGpsCache } from '../../Util/gpsSessionCache'
import useDeviceProperties from '../../Hooks/useDeviceProperties'
import useTheme from '../../Hooks/useTheme'
import WaterMarkers from './WaterMarkers'
import ViewportOutlines from './ViewportOutlines'
import SelectedWater from './SelectedWater'
import PositionPin from './PositionPin'
import MapToolbar from './MapToolbar'
import GpsTrackingOverlay from './GpsTrackingOverlay'
import GpsController from './GpsController'
import SelectedWaterOverlay from './SelectedWaterOverlay'
import { NearestWatersPanel, NearestWatersOverlay } from './NearestWaters'
import { GpsContext } from './gpsContext'

const MAP_CONFIG = {
	bounds: [
		[48.2, -69.4],
		[44.7, -63.5],
	],
	center: [46.45, -66.45],
	zoom: 7,
	minZoom: 6,
	maxZoom: 16,
}

const TILE_URLS = {
	light: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
	dark: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
}

/** Reports the current bounds + zoom whenever the map settles. */
function MapViewState({ onChange }) {
	const map = useMapEvents({
		moveend: () => onChange({ bounds: map.getBounds(), zoom: map.getZoom() }),
		zoomend: () => onChange({ bounds: map.getBounds(), zoom: map.getZoom() }),
	})

	useEffect(() => {
		onChange({ bounds: map.getBounds(), zoom: map.getZoom() })
	}, [map, onChange])

	return null
}

/** Publishes the Leaflet map instance to the parent once the container is ready. */
function MapBridge({ onMap }) {
	const map = useMap()

	useEffect(() => {
		onMap(map)
		return () => onMap(null)
	}, [map, onMap])

	return null
}

export default function MapView({ items, selectedItem, onSelect }) {
	const [map, setMap] = useState(null)
	const [mapView, setMapView] = useState({ bounds: null, zoom: null })
	const [focusToken, setFocusToken] = useState(0)
	const [nearestActive, setNearestActive] = useState(false)
	const [nearestRevealed, setNearestRevealed] = useState(false)

	const geolocation = useGeolocation()
	const deviceProperties = useDeviceProperties()
	const isTouch = deviceProperties?.isTouch ?? false
	const { isDark } = useTheme()

	// GPS phase state — owned here so context can be provided above MapContainer.
	const [gpsPhase, setGpsPhase] = useState('idle')
	const gpsPhaseRef = useRef('idle')
	gpsPhaseRef.current = gpsPhase

	// Registered map operations from GpsController (always uses a live map ref).
	const gpsOpsRef = useRef({ move: () => {}, cancelMove: () => {}, panTo: () => {} })
	const positionRef = useRef(geolocation.position)
	positionRef.current = geolocation.position

	const handleGpsReady = useCallback((ops) => {
		gpsOpsRef.current = ops
	}, [])

	const handleGpsPhaseChange = useCallback((phase) => {
		setGpsPhase(phase)
	}, [])

	const moveToUser = useCallback(() => {
		if (gpsPhaseRef.current === 'locating') return
		if (!readGpsCache()) setGpsPhase('locating')
		gpsOpsRef.current.move()
	}, [])

	const setIsTrackingRef = useRef(geolocation.setIsTracking)
	setIsTrackingRef.current = geolocation.setIsTracking

	const lockToUser = useCallback(() => {
		setIsTrackingRef.current(true)
		const pos = positionRef.current ?? readGpsCache()
		if (pos) gpsOpsRef.current.panTo(pos)
		setGpsPhase('idle')
	}, [])

	const unlock = useCallback(() => {
		setIsTrackingRef.current(false)
		gpsOpsRef.current.cancelMove()
		setGpsPhase('idle')
	}, [])

	const gpsContextValue = {
		isAvailable: geolocation.isAvailable,
		phase: gpsPhase,
		isTracking: geolocation.isTracking,
		moveToUser,
		lockToUser,
		unlock,
	}

	return (
		<GpsContext.Provider value={gpsContextValue}>
			<div className="MapView">
				<MapContainer
					preferCanvas
					maxBounds={MAP_CONFIG.bounds}
					center={MAP_CONFIG.center}
					zoom={MAP_CONFIG.zoom}
					minZoom={MAP_CONFIG.minZoom}
					maxZoom={MAP_CONFIG.maxZoom}
					zoomControl={false}
					style={{ height: '100%', width: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url={isDark ? TILE_URLS.dark : TILE_URLS.light}
					/>

					<MapBridge onMap={setMap} />
					<MapViewState onChange={setMapView} />

					<GpsController
						geolocation={geolocation}
						phase={gpsPhase}
						onPhaseChange={handleGpsPhaseChange}
						onReady={handleGpsReady}
					/>

					<WaterMarkers
						items={items}
						mapView={mapView}
						onSelect={onSelect}
						isTouch={isTouch}
					/>

					<ViewportOutlines
						mapView={mapView}
						selectedId={selectedItem?.id ?? null}
						onSelect={onSelect}
						isTouch={isTouch}
					/>

					<SelectedWater item={selectedItem} focusToken={focusToken} />

					<PositionPin
						position={geolocation.position ?? readGpsCache()}
						isTracking={geolocation.isTracking}
					/>
				</MapContainer>

				<GpsTrackingOverlay
					map={map}
					mapView={mapView}
					selectedItem={selectedItem}
					active={geolocation.isTracking}
				/>

				<SelectedWaterOverlay
					map={map}
					mapView={mapView}
					item={selectedItem}
					onFocus={() => setFocusToken((token) => token + 1)}
				/>

				<NearestWatersOverlay
					map={map}
					mapView={mapView}
					items={items}
					active={nearestActive || nearestRevealed}
					selectedId={selectedItem?.id ?? null}
					onSelect={onSelect}
				/>

				<div className="MapControls-right">
					<MapToolbar
						selectedItem={selectedItem}
						mapView={mapView}
						isTouch={isTouch}
						onFocusSelected={() => setFocusToken((token) => token + 1)}
						onClearSelected={() => onSelect(null)}
					/>

					<NearestWatersPanel
						mapView={mapView}
						items={items}
						selectedId={selectedItem?.id ?? null}
						onSelect={onSelect}
						isTouch={isTouch}
						active={nearestActive}
						onActiveChange={setNearestActive}
						onRevealChange={setNearestRevealed}
					/>
				</div>

				<div className="WatersDataAttribution">
					Waters from{' '}
					<a
						title="New Brunswick Hydrographic Network - Government of New Brunswick, Department of Natural Resources and Energy Development."
						href="https://open.canada.ca/data/en/dataset/be3bcf7c-64f5-9c6f-84d4-18bdad897ea7"
						target="_blank"
						rel="noopener noreferrer"
					>
						New Brunswick Hydrographic Network
					</a>
				</div>
			</div>
		</GpsContext.Provider>
	)
}

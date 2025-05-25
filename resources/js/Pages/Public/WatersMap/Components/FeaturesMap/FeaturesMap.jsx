import React, { useEffect, useRef } from 'react'
import { useMap, MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

// Configure the default marker icon with proper centering
const DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41], // Size of the marker icon
	iconAnchor: [12.5, 41], // Anchor point (tip of the marker) to align with the center
	shadowSize: [41, 41], // Size of the shadow
	shadowAnchor: [12.5, 41], // Anchor point of the shadow
})

L.Marker.prototype.options.icon = DefaultIcon

export default function FeaturesMap({ geoJson, highlightedGeoJson }) {
	return (
		<MapContainer>
			<FeatureContent geoJson={geoJson} highlightedGeoJson={highlightedGeoJson} />
		</MapContainer>
	)
}

const FeatureContent = ({ geoJson, highlightedGeoJson }) => {
	const layerRef = useRef(null)
	const markerRef = useRef(null)
	const map = useMap()

	// Effect to handle geoJson (polygon layer)
	useEffect(() => {
		if (!geoJson) {
			const defaultBounds = L.latLngBounds([49.28, -68.065], [43.28, -64.065])
			map.fitBounds(defaultBounds)
			return
		}

		// Remove existing layer if present
		if (layerRef.current) {
			map.removeLayer(layerRef.current)
		}

		// Create and add the polygon layer from geoJson
		let layer
		if (geoJson.geometry.type === 'Polygon' || geoJson.geometry.type === 'MultiPolygon') {
			layer = L.polygon(flipCoords(geoJson.geometry.coordinates))
			layer.addTo(map)
			map.fitBounds(layer.getBounds())
			layerRef.current = layer
		}

		return () => {
			if (layerRef.current) {
				map.removeLayer(layerRef.current)
				layerRef.current = null
			}
		}
	}, [geoJson, map])

	// Effect to handle marker positioning based on highlightedGeoJson
	useEffect(() => {
		if (markerRef.current) {
			map.removeLayer(markerRef.current)
			markerRef.current = null
		}

		// If no highlightedGeoJson is provided, do not add a marker
		if (!highlightedGeoJson) return

		// Create a temporary Leaflet layer from highlightedGeoJson to get its bounds
		const tempLayer = L.geoJSON(highlightedGeoJson)
		const center = tempLayer.getBounds().getCenter()

		// Add the marker at the center of highlightedGeoJson
		const marker = L.marker(center).addTo(map)
		markerRef.current = marker

		return () => {
			if (markerRef.current) {
				map.removeLayer(markerRef.current)
				markerRef.current = null
			}
		}
	}, [highlightedGeoJson, map])

	return (
		<>
			<TileLayer
				attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
			/>
		</>
	)
}

function flipCoords(coords) {
	return coords.map((point) => {
		if (Array.isArray(point[0])) {
			return flipCoords(point)
		}
		return [point[1], point[0]]
	})
}

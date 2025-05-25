import React, { useState, useEffect, useRef } from 'react'
import { useMap, MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
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

	const updateMarkerPosition = (layer) => {
		if (markerRef.current) {
			markerRef.current.remove()
		}
		if (!layerRef.current) return

		const center = layerRef.current.getBounds().getCenter()

		const marker = L.marker(center).addTo(map)
		markerRef.current = marker
	}

	useEffect(() => {
		if (!geoJson) {
			const defaultBounds = L.latLngBounds([49.28, -68.065], [43.28, -64.065])
			map.fitBounds(defaultBounds)
			return
		}

		if (layerRef.current) {
			map.removeLayer(layerRef.current)
		}

		let layer
		if (geoJson.geometry.type === 'Polygon' || geoJson.geometry.type === 'MultiPolygon') {
			layer = L.polygon(flipCoords(geoJson.geometry.coordinates))
			layer.addTo(map)
			map.fitBounds(layer.getBounds())
			layerRef.current = layer
		}

		updateMarkerPosition(layer)

		map.on('zoomend', updateMarkerPosition)

		return () => {
			map.off('zoomend', updateMarkerPosition)
			if (layer) map.removeLayer(layer)
			if (markerRef.current) {
				map.removeLayer(markerRef.current)
				markerRef.current = null
			}
		}
	}, [geoJson, map, updateMarkerPosition])

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

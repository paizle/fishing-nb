import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useMap, MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import * as turf from '@turf/turf'

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
		setTimeout(() => {
			const center = layerRef.current.getBounds().getCenter()

			const centeredIcon = L.icon({
				iconUrl: icon,
				iconSize: [25, 41],
				iconAnchor: [12.5, 41],
				shadowUrl: iconShadow,
				shadowSize: [41, 41],
				shadowAnchor: [12.5, 41],
			})

			const marker = L.marker(center, { icon: centeredIcon }).addTo(map)
			markerRef.current = marker
		}, 500)
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

		// Wait for layer to render before calculating pixel center
		updateMarkerPosition(layer)

		// Also recalculate on zoom
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

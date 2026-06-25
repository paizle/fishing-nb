import './WatersMap.scss'
import React, { useState, useEffect } from 'react'
import { Head } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import FeaturesMap from './Components/FeaturesMap/FeaturesMap'
import Sidebar from './Components/Sidebar/Sidebar'
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'

export default function WatersMap({ apiLastModified }) {
	const [geoJson, setGeojson] = useState(null)
	const [loadError, setLoadError] = useState(null)
	const [selectedFeature, setSelectedFeature] = useState()
	const [hoveredFeature, setHovereadFeature] = useState()

	useEffect(() => {
		async function load() {
			try {
				const nocache = Date.parse(apiLastModified)
				const url = Number.isNaN(nocache)
					? '/waters.geojson'
					: `/waters.geojson?nocache=${nocache}`
				// Avoid serving a stale cached 404 (e.g. before waters.geojson was on Hostinger).
				const response = await fetch(url, { cache: 'no-store' })
				if (!response.ok) {
					setLoadError(`Could not load waters map data (HTTP ${response.status}).`)
					return
				}
				const data = await response.json()
				setGeojson(data)
			} catch {
				setLoadError('Could not load waters map data.')
			}
		}
		load()
	}, [apiLastModified])

	const selectFeature = (id) => {
		const feature = geoJson.features.find((feature) => feature.properties.OBJECTID === id)
		setSelectedFeature(feature)
	}

	const hoverFeature = (id) => {
		const feature = geoJson.features.find((feature) => feature.properties.OBJECTID === id)
		setHovereadFeature(feature)
	}

	return (
		<PublicLayout className="WatersMap">
			<Head title="Waters Map" />
			<header>
				<PublicNav>
					<h1 className="hero">
						Smart <span>Fish</span>
					</h1>
				</PublicNav>
			</header>
			<main>
				<FeaturesMap geoJson={selectedFeature} highlightedGeoJson={hoveredFeature} />
				<Sidebar>
					{loadError ? (
						<p className="load-error">{loadError}</p>
					) : geoJson ? (
						<ul onMouseLeave={() => setHovereadFeature(null)}>
							{geoJson.features.map((feature) => (
								<li key={feature.properties.OBJECTID}>
									<button
										className={
											feature.properties.NAME1 || feature.properties.LOCALNAME
												? ''
												: 'no-name'
										}
										onClick={() => selectFeature(feature.properties.OBJECTID)}
										onMouseEnter={() =>
											hoverFeature(feature.properties.OBJECTID)
										}
										onMouseDown={() =>
											hoverFeature(feature.properties.OBJECTID)
										}
									>
										{feature.properties.NAME1 ||
											feature.properties.LOCALNAME ||
											`NID: ${feature.properties.NID}`}
									</button>
								</li>
							))}
						</ul>
					) : (
						<LoadingSpinner />
					)}
				</Sidebar>
			</main>
		</PublicLayout>
	)
}

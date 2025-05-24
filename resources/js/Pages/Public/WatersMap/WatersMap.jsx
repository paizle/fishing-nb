import './WatersMap.scss'
import React, { useState, useEffect } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import FeaturesMap from './Components/FeaturesMap/FeaturesMap'
import Sidebar from './Components/Sidebar/Sidebar'
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'

export default function WatersMap({ apiLastModified }) {
	const [geoJson, setGeojson] = useState(null)
	const [selectedFeature, setSelectedFeature] = useState()
	const [hoveredFeature, setHovereadFeature] = useState()

	useEffect(() => {
		async function load() {
			const response = await fetch('/waters.geojson')
			const data = await response.json()
			setGeojson(data)
		}
		load()
	}, [])

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
			<header>
				<PublicNav>
					<h1 className="hero">
						Smart <span>Fish</span>
					</h1>
				</PublicNav>
			</header>
			<main>
				<FeaturesMap feature={selectedFeature} highlightedFeature={hoveredFeature} />
				<Sidebar>
					{geoJson ? (
						<ul>
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

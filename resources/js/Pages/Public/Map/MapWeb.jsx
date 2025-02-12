import './MapWeb.scss'
import { useRef } from 'react'
import { pathSelectorToLocationName } from '@/Components/NewBrunswickMap/NewBrunswickMap'
import NewBrunswickMapWeb from '@/Components/NewBrunswickMap/NewBrunswickMapWeb'
import { Link } from '@inertiajs/react'

export default function MapWeb({ locations }) {
	const containerRef = useRef(null)
	const locationTitlesRef = useRef(null)

	const locationsIndexed = locations.reduce((a, e) => {
		a[e.name] = e
		return a
	}, {})

	const getLocationFromPathId = (pathId) => {
		const name = pathSelectorToLocationName[pathId]
		const location = locationsIndexed[name]
		return location
	}

	return (
		<div className="MapWeb">
			<NewBrunswickMapWeb
				containerRef={containerRef}
				onMouseEnterLocation={(event, pathId) => {
					const title = locationTitlesRef.current.querySelector(
						`[data-path-id=${pathId}] a`,
					)
					title.classList.add('highlighted')
				}}
				onMouseLeaveLocation={(event, pathId) => {
					const title = locationTitlesRef.current.querySelector(
						`[data-path-id=${pathId}] a`,
					)
					title.classList.remove('highlighted')
				}}
				onClickLocation={(event, pathId) => {
					if (locationTitlesRef.current) {
						const title = locationTitlesRef.current.querySelector(
							`[data-path-id=${pathId}] a`,
						)
						title.click()
					}
				}}
			/>

			<div className="locations" ref={locationTitlesRef}>
				<ul>
					{Object.keys(pathSelectorToLocationName).map((key) => (
						<li key={key} data-path-id={key}>
							<Link
								className={
									locationsIndexed?.[
										pathSelectorToLocationName[key]
									].hasData
										? ''
										: 'disabled'
								}
								href={route('location.region', {
									id: getLocationFromPathId(key).id,
								})}
								onClick={(event) => {
									if (
										!locationsIndexed?.[
											pathSelectorToLocationName[key]
										]?.hasData
									) {
										event.preventDefault()
										return false
									}
								}}
								onMouseEnter={(event) => {
									if (containerRef.current) {
										const location =
											containerRef.current.querySelector(
												`[id=${key}]`,
											)
										location.classList.add('active')
									}
								}}
								onMouseLeave={(event) => {
									if (containerRef.current) {
										const location =
											containerRef.current.querySelector(
												`[id=${key}]`,
											)
										location.classList.remove('active')
									}
								}}
							>
								<h3>{pathSelectorToLocationName[key]}</h3>
								<em>
									{!locationsIndexed?.[
										pathSelectorToLocationName[key]
									]?.hasData && <strong>(no data)</strong>}
									{
										locationsIndexed?.[
											pathSelectorToLocationName[key]
										]?.description
									}
								</em>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

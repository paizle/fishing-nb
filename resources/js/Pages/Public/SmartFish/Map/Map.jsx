import './Map.scss'
import { useState, useEffect, useRef } from 'react'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import NewBrunswickMap, {
	pathSelectorToLocationName,
} from '@/Components/NewBrunswickMap/NewBrunswickMap'

export default function Map({ regionsByName, selectRegion }) {
	const [selectedPathId, setSelectedPathId] = useState(null)

	const mapContainerRef = useRef(null)
	const locationTitlesRef = useRef(null)

	const onLocationClick = (event) => {
		const key = event.target.id || event.target.closest('[id]')?.id
		const region = regionsByName?.[pathSelectorToLocationName[key]]
		if (region) {
			selectRegion(region.id, region.name)
		}
	}

	const onLocationMouseEnter = (event) => {
		const key = event.target.id
		const svg = mapContainerRef.current?.querySelector('svg')
		if (svg) {
			Object.keys(pathSelectorToLocationName).forEach((pathKey) => {
				svg.querySelector('#' + pathKey)?.classList.remove('active')
			})
			svg.querySelector('#' + key)?.classList.add('active')

			selectLocation(key)
		}
	}

	const onLocationTap = (event) => {
		const target = event.target
		const key = target.id || target.closest('[id]')?.id
		if (selectedPathId === key) {
			const region = regionsByName?.[pathSelectorToLocationName[key]]
			if (region) {
				selectRegion(region.id, region.name)
			}
		} else {
			if (mapContainerRef.current) {
				Object.keys(pathSelectorToLocationName).forEach((pathKey) => {
					mapContainerRef.current.querySelector('#' + pathKey)?.classList.remove('active')
				})
				mapContainerRef.current.querySelector('#' + key)?.classList.add('active')
			}
			selectLocation(key)
		}
	}

	useEffect(() => {
		if (!mapContainerRef.current || !regionsByName) {
			return
		}

		const svg = mapContainerRef.current.querySelector('svg')
		Object.keys(pathSelectorToLocationName).forEach((pathKey) => {
			svg?.querySelector('#' + pathKey)?.classList.add('location')
		})
	}, [regionsByName])

	const selectLocation = (pathId) => {
		locationTitlesRef.current
			?.querySelectorAll('.highlighted')
			?.forEach((element) => element.classList.remove('highlighted'))

		if (pathId) {
			locationTitlesRef.current?.classList.add('selected')
			locationTitlesRef.current
				?.querySelector(`[data-path-id=${pathId}]`)
				?.classList.add('highlighted')
			setSelectedPathId(pathId)
		} else {
			locationTitlesRef.current?.classList.remove('selected')
			setSelectedPathId(null)
		}
	}

	if (!regionsByName) {
		return null
	}

	return (
		<div className={`Map ${selectedPathId ? 'location-selected' : ''}`}>
			<NewBrunswickMap
				containerRef={mapContainerRef}
				onLocationClick={onLocationClick}
				onLocationMouseEnter={onLocationMouseEnter}
				onLocationTap={onLocationTap}
			/>

			<div className="locations" ref={locationTitlesRef}>
				<ul>
					<li className={!selectedPathId ? 'highlighted' : 'hidden'}>
						<h3>New Brunswick</h3>
					</li>
					{Object.keys(pathSelectorToLocationName).map((key) => (
						<li
							key={key}
							data-path-id={key}
							className={selectedPathId === key ? 'highlighted' : ''}
						>
							<button
								onClick={() => {
									const region = regionsByName?.[pathSelectorToLocationName[key]]
									if (region) {
										selectRegion(region.id, region.name)
									}
								}}
							>
								<h3>
									{pathSelectorToLocationName[key]} <ArrowRightCircleIcon />{' '}
								</h3>
								<em>
									{regionsByName?.[pathSelectorToLocationName[key]]?.description}
								</em>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

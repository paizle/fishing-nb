import './MapMobile.scss'
import { useState, useEffect, useRef } from 'react'
import { pathSelectorToLocationName } from '@/Components/NewBrunswickMap/NewBrunswickMap'
import NewBrunswickMapMobile from '@/Components/NewBrunswickMap/NewBrunswickMapMobile'
import { ArrowRightCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react'

export default function MapMobile({ locations, onSelectLocation }) {
	const containerRef = useRef(null)
	const locationTitlesRef = useRef(null)

	const [selectedPathId, setSelectedPathId] = useState(null)
	const selectedPathIdRef = useRef(selectedPathId)

	useEffect(() => {
		selectedPathIdRef.current = selectedPathId
	}, [selectedPathId])

	const locationsIndexed = locations.reduce((a, e) => {
		a[e.name] = e
		return a
	}, {})

	const getLocationFromPathId = (pathId) => {
		const name = pathSelectorToLocationName[pathId]
		const location = locationsIndexed[name]
		return location
	}

	function closeLocation(event) {
		onTouchLocation(null, '')
	}

	const onTouchLocation = (event, pathId) => {
		locationTitlesRef.current
			.querySelectorAll('.highlighted')
			.forEach((element) => element.classList.remove('highlighted'))

		if (pathId) {
			locationTitlesRef.current.classList.add('selected')
			const title = locationTitlesRef.current.querySelector(`[data-path-id=${pathId}]`)
			title.classList.add('highlighted')
			setSelectedPathId(pathId)
		} else {
			locationTitlesRef.current.classList.remove('selected')
			setSelectedPathId(null)
		}
	}

	return (
		<div className={`MapMobile portrait ${selectedPathId ? 'selected-location' : ''}`}>
			<NewBrunswickMapMobile containerRef={containerRef} onTouchLocation={onTouchLocation} />

			<div className="locations" ref={locationTitlesRef}>
				<ul>
					{Object.keys(pathSelectorToLocationName).map((key) => (
						<li key={key} data-path-id={key}>
							<button
								className={
									locationsIndexed?.[pathSelectorToLocationName[key]].hasData
										? ''
										: 'disabled'
								}
								href={route('location.region', {
									id: getLocationFromPathId(key).id,
								})}
								onClick={() => onSelectLocation(getLocationFromPathId(key).id)}
							>
								<h3>
									{pathSelectorToLocationName[key]} <ArrowRightCircleIcon />{' '}
								</h3>
								<em>
									{!locationsIndexed?.[pathSelectorToLocationName[key]]
										?.hasData && <strong>(no data)</strong>}
									{
										locationsIndexed?.[pathSelectorToLocationName[key]]
											?.description
									}
								</em>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

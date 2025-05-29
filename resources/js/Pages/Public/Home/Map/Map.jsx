import './Map.scss'
import { useState, useEffect, useRef, useCallback } from 'react'
import useRest from '@/Hooks/useRest'
import useApplicationContext from '@/Contexts/ApplicationContext'
import { ArrowRightCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import NewBrunswickMap, {
	pathSelectorToLocationName,
} from '@/Components/NewBrunswickMap/NewBrunswickMap'
import useTap from '@/Hooks/useScreenTap'

const createResource = (asyncFn) => {
	let status = 'pending'
	let result
	let suspender = asyncFn().then(
		(res) => {
			status = 'success'
			result = res
		},
		(err) => {
			status = 'error'
			result = err
		},
	)

	return {
		read() {
			if (status === 'pending') throw suspender // ⏳ Suspends rendering
			if (status === 'error') throw result // ❌ Throw error if failed
			return result // ✅ Return data when ready
		},
	}
}

const locationsResourse = createResource(() => {
	return axios.get('/api/regions').then((request) => {
		return request.data.regions.reduce((a, v) => {
			a[v.name] = v
			return a
		}, {})
	})
})

export default function Map({ apiLastModified, selectRegion }) {
	const locationsByName = locationsResourse.read()

	const [test, setTest] = useState(null)
	const [selectedPathId, setSelectedPathId] = useState(null)

	const mapContainerRef = useRef(null)
	const locationTitlesRef = useRef(null)

	const appContext = useApplicationContext()
	const useTapHook = useTap()

	const onLocationClick = (event) => {
		const key = event.target.id || event.target.closest('[id]').id
		selectRegion(locationsByName?.[pathSelectorToLocationName[key]]?.id)
	}

	const onLocationMouseEnter = (event) => {
		const key = event.target.id
		const svg = mapContainerRef.current.querySelector('svg')
		if (svg) {
			Object.keys(pathSelectorToLocationName).forEach((key) => {
				const locationPath = svg.querySelector('#' + key)
				locationPath.classList.remove('active')
			})
			const locationPath = svg.querySelector('#' + key).classList.add('active')

			selectLocation(key)
		}
	}

	const onLocationTap = (event) => {
		const target = event.target
		const key = target.id || target.closest('[id]').id
		if (selectedPathId === key) {
			selectRegion(locationsByName?.[pathSelectorToLocationName[key]]?.id)
		} else {
			if (mapContainerRef.current) {
				Object.keys(pathSelectorToLocationName).forEach((key) => {
					const locationPath = mapContainerRef.current.querySelector('#' + key)
					locationPath.classList.remove('active')
				})
				const locationPath = mapContainerRef.current
					.querySelector('#' + key)
					.classList.add('active')
			}
			selectLocation(key)
		}
	}

	useEffect(() => {
		if (mapContainerRef.current && locationsByName) {
			const svg = mapContainerRef.current.querySelector('svg')

			Object.keys(pathSelectorToLocationName).forEach((key) => {
				console.log(key)
				const locationPath = svg.querySelector('#' + key)
				locationPath.classList.add('location')
			})
		}
	}, [mapContainerRef.current, locationsByName])

	function closeLocation(event) {
		selectLocation(null)
	}

	const selectLocation = (pathId) => {
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

	return locationsByName ? (
		<div className={`Map ${selectedPathId ? 'location-selected' : ''}`}>
			{!locationsByName ? null : (
				<NewBrunswickMap
					containerRef={mapContainerRef}
					onLocationClick={onLocationClick}
					onLocationMouseEnter={onLocationMouseEnter}
					onLocationTap={onLocationTap}
				/>
			)}

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
								onClick={() =>
									selectRegion(
										locationsByName?.[pathSelectorToLocationName[key]]?.id,
									)
								}
							>
								<h3>
									{pathSelectorToLocationName[key]} <ArrowRightCircleIcon />{' '}
								</h3>
								<em>
									{
										locationsByName?.[pathSelectorToLocationName[key]]
											?.description
									}
								</em>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	) : null
}

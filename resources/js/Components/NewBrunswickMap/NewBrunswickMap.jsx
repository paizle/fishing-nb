import { useState, useRef, useEffect } from 'react'
import NewBrunswickMapSvg from '../../../svgs/NewBrunswick.svg?react'
import './NewBrunswickMap.scss'
import useScreenTap from '@/Hooks/useScreenTap'

export const pathSelectorToLocationName = {
	restigouche: 'Restigouche',
	chaleur: 'Chaleur',
	miramichi: 'Miramichi',
	southeast: 'Southeast',
	'inner-bay-of-fundy': 'Inner Bay of Fundy',
	'lower-saint-john': 'Lower Saint John',
	southwest: 'Southwest',
	'upper-saint-john': 'Upper Saint John',
}

export default function NewBrunswickMap({
	containerRef = null,
	onLocationClick,
	onLocationMouseEnter,
	onLocationMouseLeave,
	onLocationTap,
}) {
	const useTap = useScreenTap((target) => (!target.id ? target.closest('[id]') : target))

	const internalContainerRef = useRef(null)
	const containerRefLocal = containerRef ?? internalContainerRef

	const [locationsMap, setLocationsMap] = useState({})

	useEffect(() => {
		const container = containerRefLocal.current
		if (!container) {
			return
		}

		const nextLocationsMap = {}
		Object.keys(pathSelectorToLocationName).forEach((selector) => {
			nextLocationsMap[selector] = container.querySelector('#' + selector)
		})
		setLocationsMap(nextLocationsMap)
	}, [containerRefLocal])

	useEffect(() => {
		if (containerRefLocal.current) {
			const onClick = (event) => {
				if (!useTap.hasTouched()) {
					onLocationClick(event)
				} else {
					event.preventDefault()
				}
			}

			Object.values(locationsMap).forEach((element) => {
				element.addEventListener('click', onClick)
			})
			return () => {
				Object.values(locationsMap).forEach((element) => {
					element.removeEventListener('click', onClick)
				})
			}
		}
	}, [locationsMap, onLocationClick])

	useEffect(() => {
		if (containerRefLocal.current) {
			Object.values(locationsMap).forEach((element) => {
				element.addEventListener('mouseenter', onLocationMouseEnter)
			})
			return () => {
				Object.values(locationsMap).forEach((element) => {
					element.removeEventListener('mouseenter', onLocationMouseEnter)
				})
			}
		}
	}, [locationsMap, onLocationMouseEnter])

	useEffect(() => {
		if (containerRefLocal.current) {
			Object.values(locationsMap).forEach((element) => {
				element.addEventListener('mouseenter', onLocationMouseEnter)
			})
			return () => {
				Object.values(locationsMap).forEach((element) => {
					element.removeEventListener('mouseenter', onLocationMouseEnter)
				})
			}
		}
	}, [locationsMap, onLocationMouseEnter])

	useEffect(() => {
		if (containerRefLocal.current) {
			Object.values(locationsMap).forEach((element) => {
				useTap.addTapHandler(element, onLocationTap)
			})
			return () => {
				Object.values(locationsMap).forEach((element) => {
					useTap.removeTapHandler(element, onLocationTap)
				})
			}
		}
	}, [locationsMap, onLocationTap])

	return (
		<div ref={containerRefLocal} className="NewBrunswickMap">
			<NewBrunswickMapSvg />
		</div>
	)
}

import { useState, useRef, useEffect } from 'react'
import NewBrunswickMapSvg from '../../../svgs/NewBrunswick.svg?react'
import './NewBrunswickMap.scss'
import useScreenTap from '@/Hooks/useScreenTap'

export const pathSelectorToLocationName = {
	path102: 'Restigouche',
	path47: 'Chaleur',
	path53: 'Miramichi',
	path55: 'Southeast',
	path28: 'Inner Bay of Fundy',
	path60: 'Lower Saint John',
	path89: 'Southwest',
	path62: 'Upper Saint John',
}

export default function NewBrunswickMap({
	containerRef = null,
	onLocationClick,
	onLocationMouseEnter,
	onLocationMouseLeave,
	onLocationTap,
}) {
	const useTap = useScreenTap()

	const containerRefLocal = containerRef || useRef(null)

	const [locationsMap, setLocationsMap] = useState({})

	useEffect(() => {
		const locationsMap = {}
		Object.keys(pathSelectorToLocationName).forEach((selector) => {
			const element = containerRefLocal.current.querySelector('#' + selector)
			locationsMap[selector] = element
		})
		setLocationsMap(locationsMap)
	}, [containerRef.current])

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

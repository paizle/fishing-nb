import { useState, useRef, useEffect } from 'react'
import NewBrunswickRegionMap, {
	locationElements,
} from '@/Components/NewBrunswickRegionMap/NewBrunswickRegionMap'
import { XCircleIcon } from '@heroicons/react/24/outline'
import './RegionButton.scss'

export default function RegionButton({ onClick, onBlur, onSelect, selectedRegionName, zoomed }) {
	const mapRef = useRef(null)

	const [highlightedRegionName, setHighlightedRegionName] = useState(null)

	useEffect(() => {
		if (mapRef?.current) {
			Object.values(locationElements).forEach((id) => {
				mapRef.current.querySelector(`#${id}`).classList.remove('selected')
			})

			if (selectedRegionName) {
				mapRef.current
					.querySelector(`#${locationElements[selectedRegionName]}`)
					.classList.add('selected')
			}
		}
	}, [selectedRegionName, mapRef?.current])

	const getRegionNameFromId = (id) => {
		return Object.keys(locationElements).find((k) => locationElements[k] === id)
	}

	useEffect(() => {
		setHighlightedRegionName(null)
		if (mapRef.current) {
			const clickHandler = (event) => {
				console.log('clicked')
				if (zoomed) {
					event.stopPropagation()
					const key = event.target.closest('[id]').id
					const name = getRegionNameFromId(key)
					onSelect(name)
				}
			}

			const mouseEnterHandler = (event) => {
				console.log('entered')

				if (zoomed) {
					const id = event.target.id
					mapRef.current.querySelector('#' + id).classList.add('highlighted')
					setHighlightedRegionName(getRegionNameFromId(id))
				}
			}

			const mouseLeaveHandler = () => {
				Object.values(locationElements).forEach((id) => {
					mapRef.current.querySelector('#' + id).classList.remove('highlighted')
				})
				setHighlightedRegionName(null)
			}

			Object.values(locationElements).forEach((id) => {
				const regionSvg = mapRef.current.querySelector('#' + id)
				regionSvg.addEventListener('click', clickHandler)
				regionSvg.addEventListener('mouseenter', mouseEnterHandler)
				regionSvg.addEventListener('mouseleave', mouseLeaveHandler)
			})

			return () => {
				Object.values(locationElements).forEach((id) => {
					const regionSvg = mapRef.current.querySelector('#' + id)
					regionSvg.removeEventListener('click', clickHandler)
					regionSvg.removeEventListener('mouseenter', mouseEnterHandler)
					regionSvg.removeEventListener('mouseleave', mouseLeaveHandler)
				})
			}
		}
	}, [zoomed, mapRef?.current])

	const handleClick = (e) => {
		console.log('region click')
		onClick(e)
	}

	const onRemoveClick = (e) => {
		console.log('remove', { zoomed })
		e.stopPropagation()
		onSelect(null)
	}

	return (
		<button
			className={`RegionButton ${zoomed ? 'zoomed' : ''}`}
			onClick={handleClick}
			onBlur={onBlur}
		>
			<NewBrunswickRegionMap containerRef={mapRef} />
			<div>
				<div className="title">
					{highlightedRegionName || selectedRegionName || 'New Brunswick'}
					{!highlightedRegionName && selectedRegionName && (
						<span className="remove" onClick={onRemoveClick}>
							<XCircleIcon />
						</span>
					)}
				</div>
			</div>
		</button>
	)
}

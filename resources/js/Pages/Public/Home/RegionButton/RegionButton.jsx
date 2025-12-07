import { useState, useRef, useEffect } from 'react'
import NewBrunswickRegionMap, {
	locationElements,
} from '@/Components/NewBrunswickRegionMap/NewBrunswickRegionMap'
import { XCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import './RegionButton.scss'

export default function RegionButton({
	onClick,
	onBlur,
	onSelect,
	selectedRegionName,
	zoomed,
	regions,
}) {
	const mapRef = useRef(null)
	const buttonRef = useRef(null)

	const [highlightedRegionName, setHighlightedRegionName] = useState(null)

	const isMobile = window.innerWidth <= 640

	const unhighlightRegions = () => {
		Object.values(locationElements).forEach((id) => {
			mapRef.current.querySelector(`#${id}`).classList.remove('highlighted')
		})
	}

	const highlightRegionName = (regionName) => {
		if (regionName) {
			mapRef.current
				.querySelector(`#${locationElements[regionName]}`)
				.classList.add('highlighted')
		}
	}

	const highlightRegion = (regionName) => {
		unhighlightRegions()
		highlightRegionName(regionName)
	}

	const onRegionClick = (e) => {
		if (zoomed) {
			const key = event.target.closest('[id]').id
			const name = getRegionNameFromId(key)
			onSelect(name)
		}
	}

	const onRegionTap = (e) => {
		if (zoomed) {
			const key = event.target.closest('[id]').id
			const name = getRegionNameFromId(key)
			onSelect(name)
		}
	}

	useEffect(() => {
		if (mapRef?.current) {
			highlightRegion(selectedRegionName)
		}
	}, [selectedRegionName, mapRef?.current])

	useEffect(() => {
		if (zoomed) {
			setHighlightedRegionName(selectedRegionName)
		} else {
			setHighlightedRegionName('')
		}
		highlightRegion(selectedRegionName)
	}, [zoomed])

	const handleTransitionStart = (el) => {
		buttonRef.current.addEventListener('transitionstart', () => {
			el.classList.add('is-transitioning')
		})
	}

	useEffect(() => {
		if (buttonRef.current) {
			const transitionStart = () => {
				buttonRef.current.classList.add('is-transitioning')
			}
			const transitionEnd = () => {
				buttonRef.current.classList.remove('is-transitioning')
			}
			buttonRef.current.addEventListener('transitionstart', transitionStart)
			buttonRef.current.addEventListener('transitionend', transitionEnd)

			return () => {
				buttonRef.current.removeEventListener('transitionstart', transitionStart)
				buttonRef.current.removeEventListener('transitionend', transitionEnd)
			}
		}
	}, [buttonRef.current])

	const getRegionNameFromId = (id) => {
		return Object.keys(locationElements).find((k) => locationElements[k] === id)
	}

	useEffect(() => {
		setHighlightedRegionName(null)
		if (zoomed && mapRef.current) {
			const clickHandler = (event) => {
				const key = event.target.closest('[id]').id
				const name = getRegionNameFromId(key)
				if (isMobile) {
					setHighlightedRegionName(name)
					highlightRegion(name)
				} else {
					onSelect(name)
					event.stopPropagation()
				}
			}

			const mouseEnterHandler = (event) => {
				const id = event.target.id
				mapRef.current.querySelector('#' + id).classList.add('highlighted')
				highlightRegionName(getRegionNameFromId(event.target.id))
				setHighlightedRegionName(getRegionNameFromId(id))
			}

			const mouseLeaveHandler = () => {
				unhighlightRegions()
				setHighlightedRegionName(null)
			}

			Object.values(locationElements).forEach((id) => {
				const regionSvg = mapRef.current.querySelector('#' + id)
				regionSvg.addEventListener('click', clickHandler)
				regionSvg.addEventListener('mouseenter', mouseEnterHandler)
				regionSvg.addEventListener('mouseleave', mouseLeaveHandler)
			})

			return () => {
				if (zoomed && mapRef) {
					Object.values(locationElements).forEach((id) => {
						const regionSvg = mapRef.current.querySelector('#' + id)
						regionSvg.removeEventListener('click', clickHandler)
						regionSvg.removeEventListener('mouseenter', mouseEnterHandler)
						regionSvg.removeEventListener('mouseleave', mouseLeaveHandler)
					})
				}
			}
		}
	}, [zoomed, mapRef?.current])

	const handleClick = (e) => {
		onClick(e)
	}

	const onRemove = (e) => {
		e.stopPropagation()
		onSelect(null)
	}

	const regionName = highlightedRegionName || selectedRegionName || ''

	return (
		<button
			ref={buttonRef}
			className={`RegionButton ${zoomed ? 'zoomed' : ''}`}
			onClick={handleClick}
			onBlur={onBlur}
		>
			<NewBrunswickRegionMap containerRef={mapRef} />
			<div key={regionName} className={`region`}>
				<strong className="title">
					{regionName || 'New Brunswick'}
					{regionName && regionName === selectedRegionName && (
						<span className="remove" onMouseDown={onRemove}>
							<XCircleIcon />
						</span>
					)}
					{isMobile && zoomed && regionName && (
						<span
							className="select"
							onMouseDown={() => onSelect(highlightedRegionName)}
						>
							<ArrowRightCircleIcon />
						</span>
					)}
				</strong>
				<div className="description">{regions?.[regionName]?.description}</div>
			</div>
		</button>
	)
}

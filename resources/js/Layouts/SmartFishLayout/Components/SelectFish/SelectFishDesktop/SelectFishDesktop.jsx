import './SelectFishDesktop.scss'
import { useRef, useEffect, memo } from 'react'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import getFishImageSrc from '@/Util/getFishImageSrc'
import ProgressiveImage from '@/Components/ProgressiveImage'

export default memo(function SelectFishDesktop({
	fishes = null,
	selectedFishId = null,
	selectFish = () => null,
}) {
	const fishListRef = useRef(null)

	// scroll to last selected fish
	useEffect(() => {
		if (fishListRef.current && fishes && selectedFishId) {
			setTimeout(() => {
				const element = fishListRef.current.querySelector(`[data-id="${selectedFishId}"]`)
				element?.scrollIntoView({
					behavior: 'smooth',
					inline: 'center',
				})
			})
		}
	}, [fishListRef.current, fishes, selectedFishId])

	const scrollFishesLeft = () => {
		if (fishListRef.current.scrollLeft === 0) {
			fishListRef.current.scrollLeft = fishListRef.current.scrollWidth
		} else {
			fishListRef.current.scrollLeft =
				fishListRef.current.scrollLeft -
				fishListRef.current.querySelector('[data-id]:first-child').getBoundingClientRect()
					.width
		}
	}

	const scrollFishesRight = () => {
		if (
			fishListRef.current.scrollLeft + fishListRef.current.clientWidth >=
			fishListRef.current.scrollWidth
		) {
			fishListRef.current.scrollLeft = 0
		} else {
			fishListRef.current.scrollLeft =
				fishListRef.current.scrollLeft +
				fishListRef.current.querySelector('[data-id]:first-child').getBoundingClientRect()
					.width
		}
	}

	return (
		<div className="SelectFishDesktop">
			<div className="carousel">
				<div className="fishes" ref={fishListRef} role="listbox" aria-label="Select a fish">
					{Object.keys(fishes || {}).map((key) => (
						<button
							key={fishes[key].name}
							role="option"
							aria-selected={selectedFishId === fishes[key].id}
							data-id={fishes[key].id}
							className={`fish ${selectedFishId === fishes[key].id ? 'selected' : ''}`}
							onClick={() => selectFish(fishes[key].id)}
						>
							<img src={getFishImageSrc(fishes[key].name)} alt={fishes[key].name} />
							<div className="name">{fishes[key].name}</div>
						</button>
					))}
				</div>
				<div className="navigation">
					<button className="go-left" onClick={() => scrollFishesLeft()}>
						<ArrowLeftCircleIcon />
					</button>
					<button className="go-right" onClick={() => scrollFishesRight()}>
						<ArrowLeftCircleIcon />
					</button>
				</div>
			</div>
		</div>
	)
})

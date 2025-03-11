import './SelectFishDesktop.scss'
import { useRef, useEffect } from 'react'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import getFishImageSrc from '@/Util/getFishImageSrc'
import ProgressiveImage from '@/Components/ProgressiveImage'

export default function SelectFishDesktop({
	fishes = null,
	selectedFishId = null,
	selectFish = () => null,
}) {
	const fishListRef = useRef(null)

	// scroll to last selected fish
	useEffect(() => {
		if (fishListRef.current && fishes && selectedFishId) {
			const element = fishListRef.current.querySelector(`[data-id="${selectedFishId}"]`)
			element?.scrollIntoView({
				behavior: 'smooth',
				inline: 'center',
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
			<div className="fishes" ref={fishListRef}>
				{(fishes || []).map((fish) => (
					<button
						key={fish.name}
						data-id={fish.id}
						className={`fish ${selectedFishId === fish.id ? 'selected' : ''}`}
						onClick={() => selectFish(fish.id)}
					>
						<img src={getFishImageSrc(fish.name)} alt={fish.name} />
						<div className="name">{fish.name}</div>
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
	)
}

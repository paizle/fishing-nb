import './SelectFishMobile.scss'
import { useState, useRef, useEffect, memo } from 'react'
import getFishImageSrc from '@/Util/getFishImageSrc'
import ProgressiveImage from '@/Components/ProgressiveImage'

export default memo(function SelectFishMobile({
	fishes = null,
	selectedFishId = null,
	selectFish = () => null,
}) {
	const [scrollToFish, setScrollToFish] = useState(true)

	const fishListRef = useRef(null)

	// scroll to last selected fish
	useEffect(() => {
		if (scrollToFish && fishListRef.current && fishes) {
			if (selectedFishId) {
				const element = fishListRef.current.querySelector(`[data-id="${selectedFishId}"]`)
				element?.scrollIntoView({
					behavior: 'smooth',
					inline: 'center',
				})
			}
			setScrollToFish(false)
		}
	}, [scrollToFish, fishListRef.current, fishes, selectedFishId])

	return (
		<div
			className="SelectFishMobile"
			ref={fishListRef}
			role="listbox"
			aria-label="Select a fish"
		>
			{(fishes || []).map((fish) => (
				<button
					key={fish.name}
					role="option"
					aria-selected={selectedFishId === fish.id}
					data-id={fish.id}
					className={`fish ${selectedFishId === fish.id ? 'selected' : ''}`}
					onClick={() => selectFish(fish.id)}
				>
					<ProgressiveImage
						lowResSrc="/images/fish-shadow.png"
						highResSrc={getFishImageSrc(fish.name)}
						alt={fish.name}
					/>
					<div className="name">{fish.name}</div>
				</button>
			))}
		</div>
	)
})

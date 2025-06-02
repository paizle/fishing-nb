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
				setTimeout(() => {
					const element = fishListRef.current.querySelector(
						`[data-id="${selectedFishId}"]`,
					)
					element?.scrollIntoView({
						behavior: 'smooth',
						inline: 'center',
					})
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
			{Object.keys(fishes || {}).map((key) => (
				<button
					key={key}
					role="option"
					aria-selected={selectedFishId === fishes[key].id}
					data-id={fishes[key].id}
					className={`fish ${selectedFishId === fishes[key].id ? 'selected' : ''}`}
					onClick={() => selectFish(fishes[key].id)}
				>
					<ProgressiveImage
						lowResSrc="/images/fish-shadow.png"
						highResSrc={getFishImageSrc(fishes[key].name)}
						alt={fishes[key].name}
					/>
					<div className="name">{fishes[key].name}</div>
				</button>
			))}
		</div>
	)
})

import './SelectFishMobile.scss'
import { useState, useRef, useEffect } from 'react'

export default function SelectFishMobile({
	fishes = null,
	selectedFishId = null,
	selectFish = () => null
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
						inline: 'center'
				})
			}
			setScrollToFish(false)
		}		
	}, [scrollToFish, fishListRef.current, fishes, selectedFishId])


	return (
		<div className="SelectFishMobile" ref={fishListRef}>
				{(fishes || []).map((fish) => (
						<button 
								key={fish.name}
								data-id={fish.id}
								className={`fish ${selectedFishId === fish.id ? 'selected' : ''}`}
								onClick={() => selectFish(fish.id)}
						>
								<img src="/images/fish-shadow.png" />
								<div className="name">{fish.name}</div>
						</button>
				))}
		</div>
	)
} 
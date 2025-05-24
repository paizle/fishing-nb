import React from 'react'

export default function useScreenTap(findEventTarget = null, maxDuration = 300, maxMove = 10) {
	const touchStartRef = React.useRef(null)
	const touchPositionRef = React.useRef(null)

	const onTouchStart = (event) => {
		const touch = event.touches[0]
		touchStartRef.current = { time: Date.now(), x: touch.clientX, y: touch.clientY }
		touchPositionRef.current = { x: touch.clientX, y: touch.clientY }
	}

	const onTouchMove = (event) => {
		const touch = event.touches[0]
		touchPositionRef.current = { x: touch.clientX, y: touch.clientY }
	}

	const onTouchEnd = (event) => {
		if (touchStartRef.current) {
			const timeDiff = Date.now() - touchStartRef.current.time
			const moveX = Math.abs(touchStartRef.current.x - touchPositionRef.current.x)
			const moveY = Math.abs(touchStartRef.current.y - touchPositionRef.current.y)

			if (timeDiff <= maxDuration && moveX <= maxMove && moveY <= maxMove) {
				const target = findEventTarget ? findEventTarget(event.target) : event.target
				const tapEvent = new CustomEvent('tap', { target })
				target.dispatchEvent(tapEvent)
			}
		}
		setTimeout(() => {
			touchStartRef.current = null
		}, 100)
	}

	const hasTouched = () => {
		return !!touchStartRef?.current
	}

	const addTapHandler = (element, callback) => {
		element.addEventListener('touchstart', onTouchStart)
		element.addEventListener('touchmove', onTouchMove)
		element.addEventListener('touchend', onTouchEnd)
		element.addEventListener('tap', callback)
	}

	const removeTapHandler = (element, callback) => {
		element.removeEventListener('touchstart', onTouchStart)
		element.removeEventListener('touchmove', onTouchMove)
		element.removeEventListener('touchend', onTouchEnd)
		element.removeEventListener('tap', callback)
	}

	return { hasTouched, addTapHandler, removeTapHandler }
}

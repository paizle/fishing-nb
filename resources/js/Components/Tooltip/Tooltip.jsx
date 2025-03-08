import React, { useState, useRef, useLayoutEffect } from 'react'
import './Tooltip.scss'

const Tooltip = ({ message = null, children }) => {
	const messageRef = useRef(null)

	const [hoverAndPosition, setHoverAndPosition] = useState({
		hover: false,
		flowLeft: false,
	})

	const setIsHovering = (value) => (event) => {
		event.preventDefault()
		event.stopPropagation()
		setHoverAndPosition(() => {
			return {
				hover: value,
				flowLeft: false,
			}
		})
	}

	useLayoutEffect(() => {
		if (messageRef.current) {
			setHoverAndPosition(() => {
				return {
					hover: hoverAndPosition.hover,
					flowLeft: shouldFlowLeft(messageRef.current),
				}
			})
		}
	}, [hoverAndPosition.hover])

	return (
		<a
			className={`Tooltip ${hoverAndPosition.hover ? 'show' : ''}`}
			onMouseEnter={setIsHovering(true)}
			onMouseLeave={setIsHovering(false)}
		>
			{children}
			<div
				ref={messageRef}
				className={`message ${hoverAndPosition.flowLeft ? 'flow-left' : ''}`}
			>
				<div className="message-content">{message}</div>
			</div>
		</a>
	)
}

function shouldFlowLeft(element) {
	const bounds = element.getBoundingClientRect()
	return bounds.x + bounds.width > window.innerWidth
}

export default Tooltip

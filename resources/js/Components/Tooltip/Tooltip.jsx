import React, { useState, useRef, useEffect } from 'react'
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

	useEffect(() => {
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
		<button
			className={`Tooltip ${hoverAndPosition.hover ? 'show' : ''}`}
			onMouseEnter={setIsHovering(true)}
			onMouseLeave={setIsHovering(false)}
			onFocus={setIsHovering(true)}
			onBlur={setIsHovering(false)}
			onClick={(event) => event.target.focus()}
		>
			{children}
			<div
				ref={messageRef}
				className={`message ${hoverAndPosition.flowLeft ? 'flow-left' : ''}`}
			>
				<div
					className="message-content"
					dangerouslySetInnerHTML={{ __html: message.replace('\n', '<br /><br />') }}
				></div>
			</div>
		</button>
	)
}

function shouldFlowLeft(element) {
	const bounds = element.getBoundingClientRect()
	return bounds.x + bounds.width > window.innerWidth
}

export default Tooltip

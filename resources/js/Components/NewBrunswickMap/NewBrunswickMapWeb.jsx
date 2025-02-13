import React from 'react'
import NewBrunswickMap, { pathSelectorToLocationName } from './NewBrunswickMap'

export default function NewBrunswickMapWeb({
	containerRef = null,
	onMouseEnterLocation,
	onMouseLeaveLocation,
	onClickLocation,
}) {
	const containerRefLocal = containerRef || React.createRef(null)

	React.useEffect(() => {
		if (containerRefLocal.current) {
			const svg = containerRefLocal.current.querySelector('svg')

			Object.keys(pathSelectorToLocationName).forEach((key) => {
				const locationPath = svg.querySelector('#' + key)
				locationPath.classList.add('location')
				if (onMouseEnterLocation) {
					locationPath.addEventListener('mouseenter', (event) => {
						onMouseEnterLocation(event, key)
					})
				}
				if (onMouseLeaveLocation) {
					locationPath.addEventListener('mouseleave', (event) =>
						onMouseLeaveLocation(event, key),
					)
				}
				if (onClickLocation) {
					locationPath.addEventListener('click', (event) =>
						onClickLocation(event, key),
					)
				}
			})
		}
	}, [containerRefLocal.current])

	return <NewBrunswickMap containerRef={containerRefLocal} />
}

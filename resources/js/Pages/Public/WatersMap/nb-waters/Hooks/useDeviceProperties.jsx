import { useState, useEffect } from 'react'

export default function useDeviceProperties() {
	const [deviceProperties, setDeviceProperties] = useState()

	useEffect(() => {
		const isTouchDevice =
			window.matchMedia('(pointer: coarse)').matches ||
			window.matchMedia('(hover: none)').matches
		setDeviceProperties({ isTouch: isTouchDevice })
	}, [])

	return deviceProperties
}

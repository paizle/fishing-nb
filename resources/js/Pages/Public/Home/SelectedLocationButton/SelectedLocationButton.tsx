import { useEffect, useRef } from 'react'
import './SelectedLocationButton.scss'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

interface Props {
	selectedLocation: { fullName: string }
	onClick: () => void
}

export default function SelectedLocationButton({ selectedLocation, onClick }: Props) {
	const selectedLocationButtonRef = useRef<any>(null)

	useEffect(() => {
		/* once the component is rendered, give the button focus */
		if (selectedLocationButtonRef.current) {
			selectedLocationButtonRef.current.focus()
		}
	}, [selectedLocationButtonRef])

	return (
		<button
			ref={selectedLocationButtonRef}
			aria-label="Back to search"
			onClick={onClick}
			className="SelectedLocationButton"
		>
			<strong>{selectedLocation.fullName}</strong>
			<ArrowUturnLeftIcon />
		</button>
	)
}

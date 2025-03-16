import './SelectedLocationButton.scss'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

interface Props {
	selectedLocationButtonRef: React.RefObject<HTMLButtonElement>
	selectedLocation: { label: string }
	onClick: () => void
}

export default function SelectedLocationButton({
	selectedLocationButtonRef,
	selectedLocation,
	onClick,
}: Props) {
	return (
		<button
			ref={selectedLocationButtonRef}
			onClick={onClick}
			className="SelectedLocationButton"
		>
			<strong>
				{selectedLocation.label.split('/').map((part) => (
					<span key={part}>{part}</span>
				))}
			</strong>
			<ArrowUturnLeftIcon />
		</button>
	)
}

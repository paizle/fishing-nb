import MagnifyingGlassIcon from '../../../icons/heroicons/24/outline/magnifying-glass.svg?react'
import MapIcon from '../../../icons/heroicons/24/outline/map.svg?react'
import CheckIcon from '../../../icons/heroicons/24/outline/check.svg?react'
import XMarkIcon from '../../../icons/heroicons/24/outline/x-mark.svg?react'
import ExclamationTriangleIcon from '../../../icons/heroicons/24/outline/exclamation-triangle.svg?react'
import ExclamationTriangleSolidIcon from '../../../icons/heroicons/24/outline/exclamation-triangle-solid.svg?react'

const ICONS = {
	'magnifying-glass': MagnifyingGlassIcon,
	map: MapIcon,
	check: CheckIcon,
	'x-mark': XMarkIcon,
	'exclamation-triangle': ExclamationTriangleIcon,
	'exclamation-triangle-solid': ExclamationTriangleSolidIcon,
}

export default function UiIcon({ name, className = '' }) {
	const Icon = ICONS[name]

	if (!Icon) {
		return null
	}

	return <Icon className={className} aria-hidden="true" />
}

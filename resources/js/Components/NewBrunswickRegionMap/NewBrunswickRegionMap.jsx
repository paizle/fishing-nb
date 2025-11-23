import NewBrunswickMapSvg from '../../../svgs/NewBrunswick.svg?react'
import './NewBrunswickRegionMap.scss'

// map of a location name to it's shape id in the SVG
export const locationElements = {
	Restigouche: 'restigouche',
	Chaleur: 'chaleur',
	Miramichi: 'miramichi',
	Southeast: 'southeast',
	'Inner Bay of Fundy': 'inner-bay-of-fundy',
	'Lower Saint John': 'lower-saint-john',
	Southwest: 'southwest',
	'Upper Saint John': 'upper-saint-john',
}

export default function NewBrunswickRegionMap({ containerRef }) {
	return (
		<div ref={containerRef} className="NewBrunswickRegionMap">
			<NewBrunswickMapSvg />
		</div>
	)
}

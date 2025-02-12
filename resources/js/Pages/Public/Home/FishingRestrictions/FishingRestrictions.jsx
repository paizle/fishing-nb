import './FishingRestrictions.scss'
import { useState, useRef, useEffect } from 'react'
import { byFish } from './FishingRestrictionsTransformers'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import getFishImageSrc from '@/Util/getFishImageSrc'
import FishRestrictionsTable from './FishRestrictionsTable'

export default function FishingRestrictions({
	restrictions,
	locationId,
	waterId,
}) {
	const [hiddenFields, setHiddenFields] = useState([])

	const restrictionsByFish = byFish(restrictions)

	const screenOrientation = useScreenOrientation()

	useEffect(() => {
		let hiddenFields = []
		if (locationId === 8) {
			// Lower Saint John
			hiddenFields.push('boundary')
		}
		if (waterId) {
			hiddenFields.push('watersCategory')
		}
		setHiddenFields(hiddenFields)
	}, [locationId, waterId])

	const renderFish = (fishName) => {
		return (
			<>
				<div className="fish-name">
					<strong>{fishName}</strong>
				</div>

				<div className="fish-image">
					<img src={getFishImageSrc(fishName)} />
				</div>

				<FishRestrictionsTable
					restrictions={restrictionsByFish[fishName].restrictions}
					hiddenFields={hiddenFields}
				/>
			</>
		)
	}

	return (
		<div className="FishingRestrictions">
			{Object.keys(restrictionsByFish ?? {}).map((fishName) => (
				<div className="fish-restrictions" key={fishName}>
					{renderFish(fishName)}
				</div>
			))}
		</div>
	)
}

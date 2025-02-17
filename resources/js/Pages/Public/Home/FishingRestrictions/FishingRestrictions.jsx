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
		if (locationId === 6) {
			// Lower Saint John
			hiddenFields.push('boundary')
		}
		if (waterId) {
			hiddenFields.push('watersCategory')
		}
		setHiddenFields(hiddenFields)
	}, [locationId, waterId])

	return (
		<div className="FishingRestrictions">
			{Object.keys(restrictionsByFish ?? {})
				.map((fishName) => (
					<FishRestrictionsTable
							key={fishName}
							fishName={fishName}
							fishImageSrc={getFishImageSrc(fishName)}
							restrictions={restrictionsByFish[fishName].restrictions}
							hiddenFields={hiddenFields}
					/>
			))}
		</div>
	)
}

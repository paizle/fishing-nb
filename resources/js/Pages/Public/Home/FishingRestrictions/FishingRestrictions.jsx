import './FishingRestrictions.scss'
import PropTypes from 'prop-types'
import { useState, useRef, useEffect } from 'react'
import { byFish } from './FishingRestrictionsTransformers'
import getFishImageSrc from '@/Util/getFishImageSrc'
import FishRestrictionsTable from './FishRestrictionsTable'
import FishRestrictionsExceptionsTable from './FishRestrictionsExceptionsTable'
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'
import useApplicationContext from '@/Contexts/ApplicationContext'

export default function FishingRestrictions({ isLoading, restrictions, locationId, waterId }) {
	const appContext = useApplicationContext()

	const restrictionsByFish = byFish(restrictions)

	const fishName = appContext.getUserSelectedFishName()

	const render = () => {
		if (isLoading) {
			return (
				<div className="loading">
					<LoadingSpinner />
				</div>
			)
		} else if (!restrictions) {
			return null
		} else if (restrictions.length === 0) {
			return <div className="no-results">(no results found for {fishName})</div>
		} else {
			return Object.keys(restrictionsByFish ?? {})
				.sort((a, b) => {
					if (a === '') return 1
					if (b === '') return -1
					return a.localeCompare(b)
				})
				.map((fishName) =>
					fishName ? (
						<FishRestrictionsTable
							key={fishName}
							fishName={fishName}
							fishImageSrc={getFishImageSrc(fishName)}
							restrictions={restrictionsByFish[fishName].restrictions}
							isMobile={appContext.screenOrientation.isMobile}
						/>
					) : (
						<FishRestrictionsExceptionsTable
							key={''}
							restrictions={restrictionsByFish[fishName].restrictions}
							isMobile={appContext.screenOrientation.isMobile}
						/>
					),
				)
		}
	}

	return <div className="FishingRestrictions">{render()}</div>
}

FishingRestrictions.propTypes = {
	isLoading: PropTypes.bool,
	restrictions: PropTypes.arrayOf(PropTypes.object),
	regionId: PropTypes.number.isRequired,
	waterId: PropTypes.number,
}

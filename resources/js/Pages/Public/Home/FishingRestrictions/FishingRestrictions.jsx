import { useState, useEffect } from 'react'
import './FishingRestrictions.scss'
import PropTypes from 'prop-types'
import { byFish } from './FishingRestrictionsTransformers'
import getFishImageSrc from '@/Util/getFishImageSrc'
import FishRestrictionsTable from './FishRestrictionsTable'
import FishRestrictionsExceptionsTable from './FishRestrictionsExceptionsTable'
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'
import useApplicationContext from '@/Contexts/ApplicationContext'

import useRest from '@/Hooks/useRest'

export default function FishingRestrictions({ selectedLocation, selectedFish }) {
	const [restrictions, setRestrictions] = useState()

	const appContext = useApplicationContext()

	const restrictionsByFish = byFish(restrictions)

	const fishName = appContext.getUserSelectedFishName()

	const restRestrictions = useRest(appContext?.apiLastModified ?? '1')

	let url = ''
	if (selectedLocation) {
		url += '/api/fishByLocation/'
		url += selectedLocation.value.regionId
		url += '/' + (selectedLocation.value?.waterId ?? 0)
		url += '/' + (selectedFish ?? 0)
	}

	useEffect(() => {
		restRestrictions.get(url).then((request) => {
			setRestrictions(request.data.limits)
		})
	}, [url])

	const { loading } = restRestrictions.state

	const render = () => {
		if (loading) {
			return (
				<div className="loading">
					<LoadingSpinner />
				</div>
			)
		} else if (restrictions?.length === 0) {
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
}

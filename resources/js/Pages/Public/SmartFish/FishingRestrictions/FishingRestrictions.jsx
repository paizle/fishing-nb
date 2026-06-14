import './FishingRestrictions.scss'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { buildFishTables } from './buildFishTables'
import getFishImageSrc from '@/Util/getFishImageSrc'
import FishRestrictionsTable from './FishRestrictionsTable'
import FishRestrictionsExceptionsTable from './FishRestrictionsExceptionsTable'
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'
import useApplicationContext from '@/Contexts/ApplicationContext'
import useVerifySourceModal from '@/Hooks/useVerifySourceModal'

export default function FishingRestrictions({
	isLoading,
	restrictions,
	regionId,
	waterId,
	regionName,
}) {
	const appContext = useApplicationContext()
	const { openVerify, modal } = useVerifySourceModal(
		regionName,
		appContext.screenOrientation.isMobile,
	)

	const { fishTables, undatedExceptions } = useMemo(
		() => buildFishTables(restrictions, { waterId }),
		[restrictions, waterId],
	)

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
			return (
				<>
					{fishTables.map((table) => (
						<FishRestrictionsTable
							key={table.fishName}
							fishName={table.fishName}
							fishImageSrc={getFishImageSrc(table.fishName)}
							rows={table.rows}
							isMobile={appContext.screenOrientation.isMobile}
							onVerify={(verify) =>
								openVerify(verify, table.fishName, getFishImageSrc(table.fishName))
							}
						/>
					))}
					{undatedExceptions.length > 0 ? (
						<FishRestrictionsExceptionsTable
							key="exceptions-placeholder"
							restrictions={undatedExceptions}
							isMobile={appContext.screenOrientation.isMobile}
							onVerify={(row) => openVerify(row)}
						/>
					) : null}
				</>
			)
		}
	}

	return (
		<div className="FishingRestrictions">
			{render()}
			{modal}
		</div>
	)
}

FishingRestrictions.propTypes = {
	isLoading: PropTypes.bool,
	restrictions: PropTypes.arrayOf(PropTypes.object),
	regionId: PropTypes.number.isRequired,
	waterId: PropTypes.number,
	regionName: PropTypes.string,
}

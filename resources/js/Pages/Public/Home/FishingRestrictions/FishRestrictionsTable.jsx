import './FishRestrictionsTable.scss'
import PropTypes from 'prop-types'
import config from '@/Util/config'
import { format } from 'date-fns'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import { Fragment } from 'react/jsx-runtime'
import Tooltip from '@/Components/Tooltip/Tooltip'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function FishRestrictionsTable({
	fishName,
	fishImageSrc,
	restrictions,
	hiddenFields = [],
}) {
	const screenOrientation = useScreenOrientation()

	const removeHiddenFields = (restriction) => {
		hiddenFields.forEach((hiddenField) => (restriction[hiddenField] = null))
		return restriction
	}

	const renderSeasonDateRange = (restriction, comma = false) => {
		return (
			<>
				<span>
					{format(
						restriction.seasonStart,
						screenOrientation.isMobile
							? config.displayDayMonthShortFormat
							: config.displayDayMonthFormat,
					)}{' '}
				</span>
				<span>
					-{' '}
					{format(
						restriction.seasonEnd,
						screenOrientation.isMobile
							? config.displayDayMonthShortFormat
							: config.displayDayMonthFormat,
					)}
					{comma ? ',' : ''}
				</span>
			</>
		)
	}

	const transformCaseForSentance = (sentance, value) => {
		return sentance
			? value.charAt(0).toLowerCase() + value.slice(1)
			: value.charAt(0).toUpperCase() + value.slice(1)
	}

	const uppercaseFirst = (value) => {
		return value.charAt(0).toUpperCase() + value.slice(1)
	}

	const renderExceptionDetail = (restriction) => {
		let text = ''

		if (restriction.tidal) {
			text += restriction.tidal
			if (restriction.water || restriction.watersCategory || restriction.boundary) {
				text += ' portions of '
			} else {
				text += ' waters'
			}
		}

		if (restriction.boundary) {
			text += restriction.boundary
		}

		if (!restriction.water && restriction.watersCategory) {
			if (restriction.boundary) {
				text += ' of '
			}
			text += restriction.watersCategory
		}

		if (restriction.water) {
			text += text ? ' in ' : ''
			text += restriction.water
		}

		if (restriction.fishingMethod) {
			text = restriction.fishingMethod + ' in ' + text
		}

		if (restriction.waterDescription) {
			text += text ? ' ' : ''
			text += restriction.waterDescription
		}

		text = uppercaseFirst(text)

		return ' ' + text
	}

	const renderMinSize = (restriction) => {
		const text = restriction?.minSize ?? 'N/A'
		if (!restriction.bagLimit === 0 && !restriction.hookLimit) {
			return <span className="invalid">{text}</span>
		}
		return text
	}

	const renderMaxSize = (restriction) => {
		const text = restriction?.maxSize ?? 'N/A'
		if (!restriction.bagLimit === 0 && !restriction.hookLimit) {
			return <span className="invalid">{text}</span>
		}
		return text
	}

	const renderBagLimit = (restriction) => {
		if (restriction.hookLimit) {
			return (
				<>
					{renderBagLimitValue(restriction)}
					<Tooltip message={'Daily Hook and Release Limit: ' + restriction.hookLimit}>
						<ExclamationTriangleIcon className="alert" />
					</Tooltip>
				</>
			)
		}
		return renderBagLimitValue(restriction)
	}

	const renderBagLimitValue = (restriction) => {
		return restriction.bagLimit === null ? (
			<span className="text-md leading-4">&#8734;</span>
		) : (
			restriction.bagLimit
		)
	}

	const renderRestriction = (restriction, inGroup = false, lastInGroup = false) => {
		restriction = removeHiddenFields(restriction)
		return (
			<tr className={`${inGroup && !restriction.group ? 'group' : ''}`}>
				<td className="season-exception">
					<strong className="date-range">
						{renderSeasonDateRange(
							restriction,
							restriction.group || (inGroup && !lastInGroup),
						)}
					</strong>
					{!inGroup && !restriction.group && (
						<em className="water-description">{renderExceptionDetail(restriction)}</em>
					)}
					{restriction.note && (
						<Tooltip message={restriction.note}>
							<ExclamationTriangleIcon className="alert" />
						</Tooltip>
					)}
				</td>
				<td>{renderBagLimit(restriction)}</td>
				<td>{renderMinSize(restriction)}</td>
				<td>{renderMaxSize(restriction)}</td>
			</tr>
		)
	}

	const renderGroupWaterDescription = (restriction) => (
		<tr className="group-water-description">
			<td>
				<em>{renderExceptionDetail(restriction)}</em>
			</td>
		</tr>
	)

	const renderRestrictionGroup = (restriction) => (
		<>
			{renderRestriction(restriction)}
			{renderRestrictions(restriction.group, true)}
			{renderGroupWaterDescription(restriction)}
		</>
	)

	const renderRestrictions = (restrictions, inGroup = false) => {
		return restrictions.map((restriction, index) => (
			<Fragment key={restriction.id}>
				{restriction?.group
					? renderRestrictionGroup(restriction)
					: renderRestriction(restriction, inGroup, index === restrictions.length - 1)}
			</Fragment>
		))
	}

	const renderCaption = () => (
		<caption>
			<div className="fish-name">
				<strong>{fishName}</strong>
			</div>

			<div className="fish-image">
				<img src={fishImageSrc} />
			</div>
		</caption>
	)

	return (
		<table className="FishRestrictionsTable">
			{renderCaption()}

			<thead className="header">
				<tr>
					<th className="column-header date-range">
						{!screenOrientation.isMobile && <>Season/</>}
						Restrictions
					</th>
					<th className="column-header">Bag Limit</th>
					<th className="column-header">
						{screenOrientation.isMobile ? 'Min.' : 'Minimum'} Size
					</th>
					<th className="column-header">
						{screenOrientation.isMobile ? 'Max.' : 'Maximum'} Size
					</th>
				</tr>
			</thead>
			<tbody>{renderRestrictions(restrictions)}</tbody>
		</table>
	)
}

FishRestrictionsTable.propTypes = {
	fishName: PropTypes.string.isRequired,
	fishImageSrc: PropTypes.string.isRequired,
	restrictions: PropTypes.arrayOf(PropTypes.object).isRequired,
	hiddenFields: PropTypes.arrayOf(PropTypes.string).isRequired,
}

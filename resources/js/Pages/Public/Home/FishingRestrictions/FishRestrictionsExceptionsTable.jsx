import './FishRestrictionsTable.scss'
import { memo } from 'react'
import PropTypes from 'prop-types'
import config from '@/Util/config'
import { format } from 'date-fns'
import { Fragment } from 'react/jsx-runtime'
import Tooltip from '@/Components/Tooltip/Tooltip'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function FishRestrictionsExceptionsTable({ restrictions, isMobile }) {
	const ExclamationTriangleIconMemo = memo(ExclamationTriangleIcon)

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
			if (restriction.watersCategory) {
				text += text ? ' in ' : ''
			} else if (restriction.boundary) {
				text += ' of '
			}
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
						<ExclamationTriangleIconMemo className="alert" />
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
					{restriction.note && !inGroup && !restriction.group && (
						<Tooltip message={restriction.note}>
							<ExclamationTriangleIconMemo className="alert" />
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
				{restriction.note && (
					<Tooltip message={restriction.note}>
						<ExclamationTriangleIconMemo className="alert" />
					</Tooltip>
				)}
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

	const renderExceptions = (restrictions, inGroup = false) => {
		return restrictions.map((restriction, index) => (
			<Fragment key={restriction.id}>
				{restriction.isException
					? renderException(restriction)
					: restriction?.group
						? renderRestrictionGroup(restriction)
						: renderRestriction(
								restriction,
								inGroup,
								index === restrictions.length - 1,
							)}
			</Fragment>
		))
	}

	const renderException = (restriction) => {
		return (
			<tr>
				<td className="season-exception exception">
					<em className="water-description">{renderExceptionDetail(restriction)}</em>

					<strong>{restriction.note}</strong>
				</td>
			</tr>
		)
	}

	const renderCaption = () => <caption></caption>

	return (
		<table className={`FishRestrictionsTable exceptions`}>
			{renderCaption()}
			<thead className="header">
				<tr>
					<th className="column-header date-range">Exceptions</th>
					<th className="column-header"></th>
					<th className="column-header"></th>
					<th className="column-header"></th>
				</tr>
			</thead>
			<tbody>{renderExceptions(restrictions)}</tbody>
		</table>
	)
}

FishRestrictionsExceptionsTable.propTypes = {
	restrictions: PropTypes.arrayOf(PropTypes.object).isRequired,
}

import './FishRestrictionsTable.scss'
import { memo } from 'react'
import { formatRestrictionDetail } from './formatRestrictionDetail'
import PropTypes from 'prop-types'
import config from '@/Util/config'
import { format } from 'date-fns'
import { Fragment } from 'react/jsx-runtime'
import Tooltip from '@/Components/Tooltip/Tooltip'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { getVerifiableRowProps } from '@/Util/verifiableRow'
import useSingleClick from '@/Hooks/useSingleClick'

const ExclamationTriangleIconMemo = memo(ExclamationTriangleIcon)

export default function FishRestrictionsExceptionsTable({
	restrictions,
	isMobile,
	onVerify,
	onWaterPage = false,
}) {
	const singleClick = useSingleClick()

	const renderSeasonDateRange = (restriction, comma = false) => {
		return (
			<>
				<span>
					{format(
						restriction.seasonStart,
						isMobile ? config.displayDayMonthShortFormat : config.displayDayMonthFormat,
					)}{' '}
				</span>
				<span>
					-{' '}
					{format(
						restriction.seasonEnd,
						isMobile ? config.displayDayMonthShortFormat : config.displayDayMonthFormat,
					)}
					{comma ? ',' : ''}
				</span>
			</>
		)
	}

	const renderExceptionDetail = (restriction) =>
		formatRestrictionDetail(
			{
				tidal: restriction.tidal,
				boundary: restriction.boundary,
				watersCategory: restriction.watersCategory,
				water: restriction.water,
				fishingMethod: restriction.fishingMethod,
				waterDescription: restriction.waterDescription,
			},
			onWaterPage,
		)

	const renderMinSize = (restriction) => restriction?.minSize ?? 'N/A'

	const renderMaxSize = (restriction) => restriction?.maxSize ?? 'N/A'

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
		const { rowClassName, firstCellProps, cellProps } = getVerifiableRowProps(
			restriction,
			onVerify,
			singleClick,
		)

		return (
			<tr
				className={`${inGroup && !restriction.group ? 'group' : ''} ${rowClassName}`.trim()}
			>
				<td className="season-exception" {...firstCellProps}>
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
				<td {...cellProps}>{renderBagLimit(restriction)}</td>
				<td {...cellProps}>{renderMinSize(restriction)}</td>
				<td {...cellProps}>{renderMaxSize(restriction)}</td>
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
			{renderExceptions(restriction.group, true)}
			{renderGroupWaterDescription(restriction)}
		</>
	)

	const renderExceptions = (restrictions, inGroup = false) => {
		return restrictions.map((restriction, index) => (
			<Fragment key={restriction.id}>
				{restriction.exceptionType != null
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
		const { rowClassName, firstCellProps, cellProps } = getVerifiableRowProps(
			restriction,
			onVerify,
			singleClick,
		)

		return (
			<tr className={rowClassName}>
				<td className="season-exception exception" {...firstCellProps}>
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
	isMobile: PropTypes.bool,
	onVerify: PropTypes.func.isRequired,
	onWaterPage: PropTypes.bool,
}

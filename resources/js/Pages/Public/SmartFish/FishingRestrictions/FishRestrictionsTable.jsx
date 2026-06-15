import './FishRestrictionsTable.scss'
import { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import config from '@/Util/config'
import { format } from 'date-fns'
import Tooltip from '@/Components/Tooltip/Tooltip'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { getVerifiableRowProps } from '@/Util/verifiableRow'
import useSingleClick from '@/Hooks/useSingleClick'

const ExclamationTriangleIconMemo = memo(ExclamationTriangleIcon)

function ExceptionMarker() {
	return (
		<span className="exception-marker" aria-hidden="true">
			*
		</span>
	)
}

function rowClasses(...parts) {
	return parts.filter(Boolean).join(' ')
}

export default function FishRestrictionsTable({
	fishName,
	fishImageSrc,
	rows,
	isMobile,
	onVerify,
	onWaterPage = false,
}) {
	const singleClick = useSingleClick()

	const formatDate = (date) =>
		format(date, isMobile ? config.displayDayMonthShortFormat : config.displayDayMonthFormat)

	const renderDateRange = (row) => {
		const hasOverlapAnnotation = row.strikeSeasonStart || row.strikeSeasonEnd

		return (
			<>
				<span>{formatDate(row.seasonStart)} </span>
				<span>
					- {formatDate(row.seasonEnd)}
					{hasOverlapAnnotation ? <ExceptionMarker /> : null}
					{row.dateTrailingComma ? ',' : ''}
				</span>
			</>
		)
	}

	const renderBagLimit = (row) => {
		if (row.hideBagLimit) {
			return null
		}

		if (row.hookLimit) {
			return (
				<>
					{row.bagLimitShowInfinity ? (
						<span className="text-md leading-4">&#8734;</span>
					) : (
						row.bagLimit
					)}
					<Tooltip message={'Daily Hook and Release Limit: ' + row.hookLimit}>
						<ExclamationTriangleIconMemo className="alert" />
					</Tooltip>
				</>
			)
		}

		return row.bagLimitShowInfinity ? (
			<span className="text-md leading-4">&#8734;</span>
		) : (
			row.bagLimit
		)
	}

	const renderSize = (row, field) => {
		const hide = field === 'min' ? row.hideMinSize : row.hideMaxSize
		if (hide) {
			return null
		}

		const value = field === 'min' ? row.minSize : row.maxSize
		const invalid = field === 'min' ? row.minSizeInvalid : row.maxSizeInvalid

		return invalid ? <span className="invalid">{value}</span> : value
	}

	const renderLimitCells = (row, cellProps) => {
		if (row.exceptionNoteSpan) {
			return (
				<td className="exception-limits-note" {...cellProps}>
					{row.note}
				</td>
			)
		}

		return (
			<>
				<td {...cellProps}>{renderBagLimit(row)}</td>
				<td {...cellProps}>{renderSize(row, 'min')}</td>
				<td {...cellProps}>{renderSize(row, 'max')}</td>
			</>
		)
	}

	const renderDataRow = (row) => {
		const { rowClassName, firstCellProps, cellProps } = getVerifiableRowProps(
			row.verify,
			onVerify,
			singleClick,
		)

		const dateRangeClassName = row.isExceptionRow
			? 'date-range exception-date-range'
			: 'date-range'

		return (
			<tr
				className={rowClasses(
					row.rowClassName,
					rowClassName,
					row.waterGroupContinue && 'water-group-continue',
				)}
			>
				<td className="season-exception" {...firstCellProps}>
					<strong className={dateRangeClassName}>{renderDateRange(row)}</strong>
					{row.showLocationDetail && row.locationDetail ? (
						<em className="water-description">{row.locationDetail}</em>
					) : null}
					{row.note && row.showLocationDetail && !row.exceptionNoteSpan ? (
						<Tooltip message={row.note}>
							<ExclamationTriangleIconMemo className="alert" />
						</Tooltip>
					) : null}
				</td>
				{renderLimitCells(row, cellProps)}
			</tr>
		)
	}

	const renderGroupFooterRow = (row) => (
		<tr
			className={rowClasses(
				'group-water-description',
				row.waterGroupContinue && 'water-group-continue',
			)}
			key={row.key}
		>
			<td>
				{row.locationDetail ? (
					<em className="water-description">{row.locationDetail}</em>
				) : null}
				{row.note ? (
					<Tooltip message={row.note}>
						<ExclamationTriangleIconMemo className="alert" />
					</Tooltip>
				) : null}
			</td>
		</tr>
	)

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

	const renderExceptionsHeadingRow = (row) => (
		<tr
			className={rowClasses(
				'exceptions-heading',
				row.waterGroupContinue && 'water-group-continue',
			)}
			key={row.key}
		>
			<td>
				Exceptions <ExceptionMarker />
			</td>
		</tr>
	)

	return (
		<table className={rowClasses('FishRestrictionsTable', onWaterPage && 'on-water-page')}>
			{renderCaption()}
			<thead className="header">
				<tr>
					<th className="column-header date-range">
						{!isMobile && <>Season/</>}
						Restrictions
					</th>
					<th className="column-header">Bag Limit</th>
					<th className="column-header">{isMobile ? 'Min.' : 'Minimum'} Size</th>
					<th className="column-header">{isMobile ? 'Max.' : 'Maximum'} Size</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => {
					if (row.kind === 'data') {
						return <Fragment key={row.key}>{renderDataRow(row)}</Fragment>
					}
					if (row.kind === 'exceptions-heading') {
						return renderExceptionsHeadingRow(row)
					}
					return renderGroupFooterRow(row)
				})}
			</tbody>
		</table>
	)
}

FishRestrictionsTable.propTypes = {
	fishName: PropTypes.string.isRequired,
	fishImageSrc: PropTypes.string.isRequired,
	rows: PropTypes.arrayOf(PropTypes.object).isRequired,
	isMobile: PropTypes.bool,
	onVerify: PropTypes.func.isRequired,
	onWaterPage: PropTypes.bool,
}

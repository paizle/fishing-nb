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

export default function FishRestrictionsTable({
	fishName,
	fishImageSrc,
	rows,
	isMobile,
	onVerify,
}) {
	const singleClick = useSingleClick()

	const formatDate = (date) =>
		format(date, isMobile ? config.displayDayMonthShortFormat : config.displayDayMonthFormat)

	const renderDateRange = (row) => (
		<>
			<span>{formatDate(row.seasonStart)} </span>
			<span>
				- {formatDate(row.seasonEnd)}
				{row.dateTrailingComma ? ',' : ''}
			</span>
		</>
	)

	const renderBagLimit = (row) => {
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

	const renderSize = (value, invalid) =>
		invalid ? <span className="invalid">{value}</span> : value

	const renderDetail = (locationDetail, exceptionDetail) => (
		<>
			{locationDetail ? <em className="water-description">{locationDetail}</em> : null}
			{exceptionDetail ? (
				<em className="water-description exception-overlay">{exceptionDetail}</em>
			) : null}
		</>
	)

	const renderDataRow = (row) => {
		const { rowClassName, firstCellProps, cellProps } = getVerifiableRowProps(
			row.verify,
			onVerify,
			singleClick,
		)

		return (
			<tr className={`${row.rowClassName} ${rowClassName}`.trim()}>
				<td className="season-exception" {...firstCellProps}>
					<strong className="date-range">{renderDateRange(row)}</strong>
					{row.showLocationDetail
						? renderDetail(row.locationDetail, row.exceptionDetail)
						: null}
					{row.note && row.showLocationDetail ? (
						<Tooltip message={row.note}>
							<ExclamationTriangleIconMemo className="alert" />
						</Tooltip>
					) : null}
				</td>
				<td {...cellProps}>{renderBagLimit(row)}</td>
				<td {...cellProps}>{renderSize(row.minSize, row.minSizeInvalid)}</td>
				<td {...cellProps}>{renderSize(row.maxSize, row.maxSizeInvalid)}</td>
			</tr>
		)
	}

	const renderGroupFooterRow = (row) => (
		<tr className="group-water-description" key={row.key}>
			<td>
				{renderDetail(row.locationDetail, row.exceptionDetail)}
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

	return (
		<table className="FishRestrictionsTable">
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
				{rows.map((row) =>
					row.kind === 'data' ? (
						<Fragment key={row.key}>{renderDataRow(row)}</Fragment>
					) : (
						renderGroupFooterRow(row)
					),
				)}
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
}

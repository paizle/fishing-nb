import './FishLimitsGrid.scss'
import { useRef } from 'react'
import { byFish } from './FishLimitsTransformers'
import config from '@/Util/config'
import { format } from 'date-fns'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import getFishImageSrc from '@/Util/getFishImageSrc'

export default function FishLimitsGrid({ limits, fishes, hiddenFields = [] }) {

	const limitsByFish = byFish(limits)

	const screenOrientation = useScreenOrientation()

	const renderSeasonDateRange = (limit, comma = false) => {
		return (
			<>
				<span>
					{format(
						limit.seasonStart,
						screenOrientation.isMobile
							? config.displayDayMonthShortFormat
							: config.displayDayMonthFormat,
					)}{' '}
				</span>
				<span>
					-{' '}
					{format(
						limit.seasonEnd,
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
		if (sentance) {
			value = value.charAt(0).toLowerCase() + value.slice(1)
		} else {
			value = value.charAt(0).toUpperCase() + value.slice(1)
		}
		return value
	}

	const renderExceptionDetail = (limit) => {

		let text = ''

		if (limit.tidal) {
			text += transformCaseForSentance(text, limit.tidal)
			if (limit.water || limit.watersCategory || limit.boundary) {
				text += ' portions of'
			} else {
				text += ' waters'
			}
		}

		if (limit.boundary) {
			text += text ? ' ' : ''
			text += transformCaseForSentance(text, limit.boundary)
			if (limit.watersCategory) {
				text += ' of '
			}
		}

		if (!limit.water && limit.watersCategory) {
			text += transformCaseForSentance(text, limit.watersCategory)
		}

		if (limit.waterDescription && !limit.water) {
			text += limit.boundary
		}

		if (limit.water) {
			text += text ? ' ' : ''
			text += limit.water
		}

		if (limit.fishingMethod) {
			text = limit.fishingMethod + ' in ' + transformCaseForSentance(text, text)
		}

		if (limit.waterDescription) {
			text += text ? ' ' : ''
			text += limit.waterDescription
		}

		return ' ' + text
	}

	const renderMinSize = (limit) => {
		const text = limit?.minSize ?? 'N/A'
		if (limit.bagLimit === 0) {
			return <span className="invalid">{text}</span>
		}
		return text
	}

	const renderMaxSize = (limit) => {
		const text = limit?.maxSize ?? 'N/A'
		if (limit.bagLimit === 0) {
			return <span className="invalid">{text}</span>
		}
		return text
	}

	const renderBagLimit = (limit) => {
		if (limit.bagLimit === null) {
			return <span className="text-md leading-4">&#8734;</span>
		}
		return limit.bagLimit
	}

	const cancelHiddenFields = (limit) => {
		hiddenFields.forEach((hiddenField) => limit[hiddenField] = null)
		return limit
	}

	const renderFishLimit = (limit, inGroup = false, lastInGroup = false) => {
		limit = cancelHiddenFields(limit)
		return (
			<div
				className={`limit ${inGroup && !limit.group ? 'sub-group' : ''}`}
			>
				<div className="season-exception">
					<strong className="date-range">
						{renderSeasonDateRange(limit, (limit.group || (inGroup && !lastInGroup)))}
					</strong>
					{(!inGroup && !limit.group) && (
						<em className="water-description">
							{renderExceptionDetail(limit)}
						</em>
					)}
				</div>
				<div>{renderBagLimit(limit)}</div>
				<div>{renderMinSize(limit)}</div>
				<div>{renderMaxSize(limit)}</div>
			</div>
		)
	}

	const renderFishLimits = (limits, inGroup = false) => {
		return limits.map((limit, index) =>
			limit?.group ? (
				<>
					{renderFishLimit(limit)}
					{renderFishLimits(limit.group, true)}
					<em className="group-water-description">
						{renderExceptionDetail(limit)}
					</em>
				</>
			) : (
				<>
					{renderFishLimit(limit, inGroup, index === (limits.length - 1))}
				</>
			),
		)
	}

	const renderFishGrid = (fishName) => {

		return (
			<>
				<div className="fish-name">
					<strong>{fishName}</strong>
				</div>

				<div className="fish-image">
					<img src={getFishImageSrc(fishName)} />
				</div>

				<div className="header">
					<div className="column-header date-range">
						{!screenOrientation.isMobile && (
							<>Season/</>
						)}
						Restrictions
					</div>
					<div className="column-header">Bag Limit</div>
					<div className="column-header">
						{screenOrientation.isMobile
							? 'Min.'
							: 'Minimum'}{' '}
						Size
					</div>
					<div className="column-header">
						{screenOrientation.isMobile
							? 'Max.'
							: 'Maximum'}{' '}
						Size
					</div>
				</div>

				<div className="limits">
					{renderFishLimits(limitsByFish[fishName].limits)}
				</div>
			</>
		)
	}

	return (
		<div className="FishLimitsGrid">
			<div className="body">
				{Object.keys(limitsByFish ?? {}).map((fishName, index) => (
					<div className="fish-row-container" key={fishName}>
						{renderFishGrid(fishName)}
					</div>
				))}
			</div>
		</div>
	)
}

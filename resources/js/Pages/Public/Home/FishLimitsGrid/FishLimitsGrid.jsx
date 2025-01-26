import './FishLimitsGrid.scss'
import { useRef } from 'react'
import { formatResults } from './FishLimitsTransformers'
import config from '@/Util/config'
import { format } from 'date-fns'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Tooltip from '@/Components/Tooltip/Tooltip'
import useScreenOrientation from '@/Hooks/useScreenOrientation'

export default function FishLimitsGrid({ limits }) {

    const fishes = formatResults(limits)

    const screenOrientation = useScreenOrientation()

    const dataTableRef = useRef(null)

    const renderSeasonDateSpan = (o, inGroup = false) => {
        return (
            <>
                <span>
                    {format(
                        o.seasonStart,
                        screenOrientation.isMobile
                            ? config.displayDayMonthShortFormat
                            : config.displayDayMonthFormat,
                    )}{' '}
                </span>
                <span>
                    -{' '}
                    {format(
                        o.seasonEnd,
                        screenOrientation.isMobile
                            ? config.displayDayMonthShortFormat
                            : config.displayDayMonthFormat,
                    )}
                    {inGroup ? ',' : ''}
                </span>
            </>
        )
    }

    const renderGroupWaterStretch = (limit) => {
        return limit.waterDescription ? (
            <em className="group-water-description">
                {renderExceptionDetail(limit)}
            </em>
        ) : null
    }

    const renderExceptionDetail = (limit) => {
        
        let text = ''

        if (!limit.water && limit.watersCategory) {
            text += limit.watersCategory + ': '
        }

        if (limit.tidal) {
            text += limit.tidal
        }

        if (limit.boundary) {
            text += limit.tidal ? ', ' : ''
            text += text ? ' ' : ''
            text += limit.boundary
        }
        
        if (limit.waterDescription && !limit.water) {
            text += limit.boundary
        }
        
        if (limit.water) {
            text = limit.water + (text ? ': ' : ' ') + text
        }

        if (limit.fishingMethod) {
            text = limit.fishingMethod  + ' in ' + text
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

    const renderFishLimit = (limit, inGroup = false) => {
        return (
            <div
                className={`limit ${inGroup && !limit.group  ? 'sub-group' : ''}`}
            >
                <div className="season-exception">
                    <span className="date-span">
                        {renderSeasonDateSpan(limit, limit.group || inGroup)}
                    </span>
                    {!inGroup && (
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

    const renderFishLimits = (limits, inGroup = false) =>
        limits.map((limit, index) =>
            limit?.group ? (
                <>
                    {renderFishLimit(limit, true)}
                    {renderFishLimits(limit.group, true)}
                    {renderGroupWaterStretch(limit)}
                </>
            ) : (
                <>
                    {renderFishLimit(limit, inGroup)}
                </>
            ),
        )

    return (
        <div className="FishLimitsGrid" ref={dataTableRef}>
            <div className="header">
                <div className="column-header date-range">
                    {!screenOrientation.isMobile && (
                        <>Fish/Season/</>
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

            <div className="body">
                {Object.keys(fishes ?? {}).map(
                    (fishName, index) => (
                        <div className="fish-row-container" key={fishName}>
                            <div className={`fish-name ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                <div className="fish-season">
                                    <strong>
                                        {fishName}
                                    </strong>
                                </div>
                            </div>

                            <div
                                className={`limits ${index % 2 === 0 ? 'even' : 'odd'}`}
                            >
                                {renderFishLimits(
                                    fishes[fishName].limits,
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

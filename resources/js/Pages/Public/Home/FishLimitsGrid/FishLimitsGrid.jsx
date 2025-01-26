import './FishLimitsGrid.scss'
import { useRef } from 'react'
import { formatResults } from './FishLimitsTransformers'
import config from '@/Util/config'
import { format } from 'date-fns'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Tooltip from '@/Components/Tooltip/Tooltip'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import getFishImageSrc from '@/Util/getFishImageSrc'

export default function FishLimitsGrid({ limits, fishes }) {

    const limitsByFish = formatResults(limits)

    const screenOrientation = useScreenOrientation()

    const dataTableRef = useRef(null)

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

    const renderGroupWaterStretch = (limit) => {
        return (
            <em className="group-water-description">
                {renderExceptionDetail(limit)}
            </em>
        )
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

    const renderFishLimit = (limit, inGroup = false, lastInGroup = false) => {
        return (
            <div
                className={`limit ${inGroup && !limit.group  ? 'sub-group' : ''}`}
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

    const renderFishLimits = (limits, inGroup = false) =>
        limits.map((limit, index) =>
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

    return (
        <div className="FishLimitsGrid" ref={dataTableRef}>
            

            <div className="body">
                
                {Object.keys(limitsByFish ?? {}).map(
                    (fishName, index) => (

                        <>
                        

                        <div className="fish-row-container" key={fishName}>
                            <div className={`fish-name ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                <strong>{fishName}</strong>
                            </div>

                            <div className={`fish-image ${index % 2 === 0 ? 'even' : 'odd'}`}>
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

                            <div
                                className={`limits ${index % 2 === 0 ? 'even' : 'odd'}`}
                            >
                                {renderFishLimits(limitsByFish[fishName].limits)}
                            </div>
                        </div>

                        </>
                    ))
                }
            </div>
        </div>
    )
}

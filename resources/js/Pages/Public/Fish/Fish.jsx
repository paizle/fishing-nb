import './Fish.scss'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import config from '@/Util/config'
import { format } from 'date-fns'
import parseMySqlDate from '@/Util/parseMySqlDate'
import getFishImage from '@/Util/getFishImage'
import transformLimits from './FishTransformers'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'

export default function Fish({fish, limits, breadcrumb}) {

    const results = transformLimits(limits)

    console.log(results)

    const renderWaterColumn = (row) => {
        let extra = []

        if (row.water) {
            extra.push(row.water.name)
        }

        if (!row.water && row.waters_category) {
            extra.push(row.waters_category.name)
        }

        extra.push(': ')

        if (row.boundary) {
            extra.push(row.boundary.name)
        }

        if (row.tidal_category) {
            extra.push(', ' + row.tidal_category.name + ' waters')
        }

        if (row.fishing_method) {
            if (
                row.fishing_method.name ===
                'May only be angled by artificial fly or baited barbless hook with a single point'
            ) {
                extra.push(': Fly Fishing')
            } else {
                extra.push(': ' + row.fishing_method.name)
            }
        }

        if (row.water_description) {
            extra.push(' ' + row.water_description)
        }

        return (
            <>
                {extra.map((text) => (
                    <span className="extra">{text}</span>
                ))}
            </>
        )
    }

    return (
        <PublicLayout>
            <header>
                <PublicNav>
                    <Breadcrumb breadcrumb={breadcrumb} />
                </PublicNav>
            </header>
            <main className="Fish">

                <img className="fish-image" src={getFishImage(fish.name)} />

                <div className="fish-limit-grid">
                    <header className="header">
                        <div>Restrictions</div>
                        <div>Min Size</div>
                        <div>Max Size</div>
                        <div>Bag Limit</div>
                        <div>Season Start</div>
                        <div>Season End</div>
                    </header>
                    <div className="body">
                        {Object.keys(results).map((location) => (
                            <div className="location-group">
                                <div className="location-name">{location}</div>
                                
                                {results[location].map((limit, index) => (
                                    <div className="row">
                                        <div className="">{renderWaterColumn(limit)}</div>
                                        <div>{limit.minimum_size}</div>
                                        <div>{limit.maximum_size}</div>
                                        <div>{limit.bag_limit}</div>
                                        <div>{
                                            format(
                                                parseMySqlDate(limit.season_start),
                                                config.displayDayMonthShortFormat
                                            )}
                                        </div>
                                        <div>{
                                            format(
                                                parseMySqlDate(limit.season_end),
                                                config.displayDayMonthShortFormat
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        ))}
                    </div>
                </div>
            </main>
        </PublicLayout>
    )
}


/* 
schema={{
                    'Water Body/Fishing Method': renderWaterColumn,
                    'Min Size': (row) => row.minimum_size ?? 'N/A',
                    'Max Size': (row) => row.maximum_size ?? 'N/A',
                    Limit: (row) => row.bag_limit ?? 'Unlimited',
                    'Season Start': (row) =>
                        format(
                            parseMySqlDate(row.season_start),
                            config.displayDayMonthShortFormat,
                        ),
                    'Season End': (row) =>
                        format(
                            parseMySqlDate(row.season_end),
                            config.displayDayMonthShortFormat,
                        ),
                }}
*/
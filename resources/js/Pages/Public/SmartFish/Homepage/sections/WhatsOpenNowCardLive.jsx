import useRest from '@/Hooks/useRest'
import { format, parseISO } from 'date-fns'
import { useEffect, useMemo } from 'react'
import {
	findTodayEntries,
	pickFeaturedRows,
} from '@/Pages/Public/SmartFish/Homepage/whatsOpenNowFeatured'

export default function WhatsOpenNowCardLive({ apiLastModified = '' }) {
	const { state, get } = useRest(apiLastModified)

	useEffect(() => {
		get('/api/calendar')
	}, [])

	const rows = useMemo(() => {
		if (!state.data) {
			return []
		}

		return pickFeaturedRows(findTodayEntries(state.data))
	}, [state.data])

	const dateLabel = state.data?.anchorDate
		? format(parseISO(state.data.anchorDate), 'EEEE, MMMM d, yyyy')
		: format(new Date(), 'EEEE, MMMM d, yyyy')

	return (
		<aside className="WhatsOpenNowCard" aria-labelledby="whats-open-live-heading">
			<h2 id="whats-open-live-heading" className="WhatsOpenNowCard-title">
				What&apos;s Open Right Now?
			</h2>
			<p className="WhatsOpenNowCard-date">{dateLabel}</p>

			{state.loading && <p className="WhatsOpenNowCard-date">Loading…</p>}

			{state.error && <p className="WhatsOpenNowCard-date">{state.error}</p>}

			{!state.loading && !state.error && (
				<ul className="WhatsOpenNowCard-list">
					{rows.map((row) => (
						<li
							key={row.fishName}
							className={`WhatsOpenNowCard-item is-${row.statusClass}`}
						>
							<span className="WhatsOpenNowCard-name">{row.fishName}</span>
							<span className="WhatsOpenNowCard-status">{row.statusLabel}</span>
						</li>
					))}
				</ul>
			)}

			<a href="#species" className="WhatsOpenNowCard-link">
				View All Seasons
			</a>
		</aside>
	)
}

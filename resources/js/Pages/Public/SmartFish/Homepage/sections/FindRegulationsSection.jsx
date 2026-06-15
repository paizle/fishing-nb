import './FindRegulationsSection.scss'
import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const FILTER_TABS = ['Search All', 'Waterbody', 'Species', 'Region']

const POPULAR_TAGS = [
	'Miramichi River',
	'Grand Lake',
	'Brook Trout',
	'Smallmouth Bass',
	'Chaleur',
	'Fredericton',
]

export default function FindRegulationsSection() {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<section
			id="find-regulations"
			className="FindRegulationsSection"
			aria-labelledby="find-regulations-heading"
		>
			<div className="FindRegulationsSection-inner">
				<h2 id="find-regulations-heading" className="FindRegulationsSection-heading">
					Find Regulations Fast
				</h2>
				<p className="FindRegulationsSection-note">
					Prototype — search coming soon. Use the{' '}
					<a href={route('maps.waters')}>Waters Map</a> to find a waterbody today.
				</p>

				<div
					className="FindRegulationsSection-tabs"
					role="tablist"
					aria-label="Search filters"
				>
					{FILTER_TABS.map((tab, index) => (
						<button
							key={tab}
							type="button"
							role="tab"
							className={`FindRegulationsSection-tab ${activeTab === index ? 'is-active' : ''}`}
							aria-selected={activeTab === index}
							onClick={() => setActiveTab(index)}
						>
							{tab}
						</button>
					))}
				</div>

				<div className="FindRegulationsSection-search">
					<input
						type="search"
						className="FindRegulationsSection-input"
						placeholder="Search waterbodies, species, or regions…"
						disabled
						aria-disabled="true"
						aria-label="Search regulations (coming soon)"
					/>
					<button
						type="button"
						className="FindRegulationsSection-searchBtn"
						disabled
						aria-disabled="true"
					>
						<MagnifyingGlassIcon aria-hidden="true" />
						Search
					</button>
				</div>

				<div className="FindRegulationsSection-tags">
					<span className="FindRegulationsSection-tagsLabel">Popular:</span>
					{POPULAR_TAGS.map((tag) => (
						<span key={tag} className="FindRegulationsSection-tag">
							{tag}
						</span>
					))}
				</div>
			</div>
		</section>
	)
}

import './WhatsOpenNowCard.scss'

const PLACEHOLDER_SPECIES = [
	{ name: 'Brook Trout', status: 'open', label: 'Open' },
	{ name: 'Smallmouth Bass', status: 'open', label: 'Open' },
	{ name: 'Chain Pickerel', status: 'open', label: 'Open' },
	{ name: 'Landlocked Salmon', status: 'open', label: 'Open' },
	{ name: 'Lake Trout', status: 'open', label: 'Open' },
	{
		name: 'Atlantic Salmon',
		status: 'warning',
		label: 'Retention prohibited',
	},
]

function formatToday() {
	return new Date().toLocaleDateString('en-CA', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

export default function WhatsOpenNowCard() {
	return (
		<aside className="WhatsOpenNowCard" aria-labelledby="whats-open-heading">
			<h2 id="whats-open-heading" className="WhatsOpenNowCard-title">
				What&apos;s Open Right Now?
			</h2>
			<p className="WhatsOpenNowCard-date">{formatToday()}</p>
			<ul className="WhatsOpenNowCard-list">
				{PLACEHOLDER_SPECIES.map((species) => (
					<li key={species.name} className={`WhatsOpenNowCard-item is-${species.status}`}>
						<span className="WhatsOpenNowCard-name">{species.name}</span>
						<span className="WhatsOpenNowCard-status">{species.label}</span>
					</li>
				))}
			</ul>
			<a href="#species" className="WhatsOpenNowCard-link">
				View All Seasons
			</a>
		</aside>
	)
}

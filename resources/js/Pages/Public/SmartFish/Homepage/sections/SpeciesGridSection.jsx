import './SpeciesGridSection.scss'
import { FishIconPlaceholder } from './FishIconPlaceholder'

const PROTOTYPE_SPECIES = [
	'Landlocked Salmon',
	'Arctic Char',
	'Lake Whitefish',
	'Brook Trout',
	'Lake Trout',
	'Smallmouth Bass',
	'Chain Pickerel',
	'Yellow Perch',
	'American Eel',
	'Rainbow Trout',
]

export default function SpeciesGridSection({ fishes }) {
	const speciesList = fishes
		? Object.values(fishes)
				.map((fish) => fish.name)
				.sort((a, b) => a.localeCompare(b))
		: PROTOTYPE_SPECIES

	const displaySpecies = speciesList.slice(0, 10)

	return (
		<section id="species" className="SpeciesGridSection" aria-labelledby="species-heading">
			<div className="SpeciesGridSection-inner">
				<h2 id="species-heading" className="SpeciesGridSection-heading">
					Regulations by Species
				</h2>
				<p className="SpeciesGridSection-sub">
					Select a species to view seasons, limits, and special rules.
				</p>

				<div className="SpeciesGridSection-grid">
					{displaySpecies.map((name) => (
						<article key={name} className="SpeciesGridSection-card">
							<FishIconPlaceholder name={name} />
							<h3 className="SpeciesGridSection-name">{name}</h3>
							<a href="#find-regulations" className="SpeciesGridSection-link">
								View Regulations
							</a>
						</article>
					))}
				</div>

				<div className="SpeciesGridSection-more">
					<a href="#find-regulations" className="SpeciesGridSection-moreBtn">
						View All Species
					</a>
				</div>
			</div>
		</section>
	)
}

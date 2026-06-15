import './MapPreviewSection.scss'
import { Link } from '@inertiajs/react'
import { MapIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const FEATURES = [
	'Open seasons and closed periods',
	'Daily bag limits',
	'Size restrictions',
	'Waterbody-specific rules',
	'Special management areas',
]

export default function MapPreviewSection() {
	return (
		<section className="MapPreviewSection" aria-labelledby="map-preview-heading">
			<div className="MapPreviewSection-inner">
				<div className="MapPreviewSection-copy">
					<h2 id="map-preview-heading" className="MapPreviewSection-heading">
						Explore New Brunswick Waters
					</h2>
					<p className="MapPreviewSection-text">
						Browse hundreds of lakes, rivers, and streams on an interactive map. Select
						a waterbody to view current regulations for that location.
					</p>
					<ul className="MapPreviewSection-features">
						{FEATURES.map((feature) => (
							<li key={feature}>
								<CheckCircleIcon aria-hidden="true" />
								{feature}
							</li>
						))}
					</ul>
					<Link href={route('maps.waters')} className="MapPreviewSection-cta">
						<MapIcon aria-hidden="true" />
						Launch Map
					</Link>
				</div>
				<div className="MapPreviewSection-visual">
					<img
						src="/images/redesign/map-preview.png"
						alt="Preview of the New Brunswick waters map"
						className="MapPreviewSection-image"
					/>
				</div>
			</div>
		</section>
	)
}

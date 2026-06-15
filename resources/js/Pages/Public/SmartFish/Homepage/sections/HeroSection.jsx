import './HeroSection.scss'
import { Link } from '@inertiajs/react'
import WhatsOpenNowCard from './WhatsOpenNowCard'

export default function HeroSection() {
	return (
		<section className="HeroSection" aria-labelledby="hero-heading">
			<div className="HeroSection-backdrop" aria-hidden="true" />
			<div className="HeroSection-inner">
				<div className="HeroSection-content">
					<h1 id="hero-heading" className="HeroSection-heading">
						New Brunswick Fishing Regulations Made Simple
					</h1>
					<p className="HeroSection-subheading">
						Check seasons, bag limits, size restrictions, and waterbody-specific rules —
						all in one place. Plan your next trip with confidence.
					</p>
					<div className="HeroSection-actions">
						<Link
							href={route('maps.waters')}
							className="HeroSection-btn HeroSection-btn--primary"
						>
							Search a Waterbody
						</Link>
						<Link
							href={route('maps.waters')}
							className="HeroSection-btn HeroSection-btn--outline"
						>
							Open Interactive Map
						</Link>
					</div>
					<p className="HeroSection-disclaimer">
						Data sourced from official NB fishing regulations. Always verify before you
						fish.
					</p>
				</div>
				<WhatsOpenNowCard />
			</div>
		</section>
	)
}

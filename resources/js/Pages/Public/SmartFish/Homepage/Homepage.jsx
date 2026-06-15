import './Homepage.scss'
import RedesignLayout from '@/Layouts/RedesignLayout/RedesignLayout'
import HeroSection from './sections/HeroSection'
import FindRegulationsSection from './sections/FindRegulationsSection'
import MapPreviewSection from './sections/MapPreviewSection'
import SpeciesGridSection from './sections/SpeciesGridSection'
import HowItWorksSection from './sections/HowItWorksSection'

export default function Homepage({ fishes }) {
	return (
		<RedesignLayout>
			<div className="Homepage">
				<HeroSection />
				<FindRegulationsSection />
				<MapPreviewSection />
				<SpeciesGridSection fishes={fishes} />
				<HowItWorksSection />
			</div>
		</RedesignLayout>
	)
}

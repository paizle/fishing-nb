import './HowItWorksSection.scss'
import { MapPinIcon, DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const STEPS = [
	{
		icon: MapPinIcon,
		title: 'Find Your Water',
		text: 'Search by name or explore the interactive map to locate lakes, rivers, and streams across New Brunswick.',
	},
	{
		icon: DocumentTextIcon,
		title: 'View Current Regulations',
		text: 'See open seasons, daily bag limits, size restrictions, and special rules for your chosen waterbody.',
	},
	{
		icon: ShieldCheckIcon,
		title: 'Fish With Confidence',
		text: 'Head out knowing the rules — and always double-check official sources before you cast.',
	},
]

export default function HowItWorksSection() {
	return (
		<section className="HowItWorksSection" aria-labelledby="how-it-works-heading">
			<div className="HowItWorksSection-inner">
				<h2 id="how-it-works-heading" className="HowItWorksSection-heading">
					How It Works
				</h2>
				<div className="HowItWorksSection-steps">
					{STEPS.map((step) => (
						<div key={step.title} className="HowItWorksSection-step">
							<div className="HowItWorksSection-iconWrap">
								<step.icon aria-hidden="true" />
							</div>
							<h3 className="HowItWorksSection-stepTitle">{step.title}</h3>
							<p className="HowItWorksSection-stepText">{step.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

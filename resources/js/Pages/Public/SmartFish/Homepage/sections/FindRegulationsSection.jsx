import './FindRegulationsSection.scss'
import { Link } from '@inertiajs/react'
import SearchForm from '../../Search/SearchForm'
import { POPULAR_TAGS, popularTagHref } from '../../Search/popularTags'

export default function FindRegulationsSection() {
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

				<SearchForm />

				<div className="FindRegulationsSection-tags">
					<span className="FindRegulationsSection-tagsLabel">Popular:</span>
					{POPULAR_TAGS.map((tag) => (
						<Link
							key={tag.label}
							href={popularTagHref(tag)}
							className="FindRegulationsSection-tag"
						>
							{tag.label}
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}

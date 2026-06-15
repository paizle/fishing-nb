import './SearchResults.scss'
import { useEffect, useMemo, useState } from 'react'
import { Link } from '@inertiajs/react'
import RedesignLayout from '@/Layouts/RedesignLayout/RedesignLayout'
import useRest from '@/Hooks/useRest'
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'
import SearchForm from './SearchForm'
import {
	buildRegulationUrl,
	groupResultsByType,
	resultTypeLabel,
	SEARCH_SCOPE_LABELS,
} from './searchHelpers'

function readSearchParams() {
	const params = new URLSearchParams(window.location.search)
	return {
		q: params.get('q')?.trim() ?? '',
		scope: params.get('scope') ?? 'all',
	}
}

export default function SearchResults({ apiLastModified }) {
	const [{ q, scope }, setParams] = useState(readSearchParams)
	const [results, setResults] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const rest = useRest(apiLastModified)

	useEffect(() => {
		const sync = () => setParams(readSearchParams())
		window.addEventListener('popstate', sync)
		return () => window.removeEventListener('popstate', sync)
	}, [])

	useEffect(() => {
		if (q.length < 2) {
			setResults([])
			setError(null)
			setLoading(false)
			return
		}

		let cancelled = false
		setLoading(true)
		setError(null)

		const params = new URLSearchParams({ q, scope })
		rest.get(`/api/search?${params}`)
			.then((response) => {
				if (cancelled) {
					return
				}

				if (response?.data?.results) {
					setResults(response.data.results)
				} else {
					setResults([])
					if (response === null) {
						setError('Search failed. Please try again.')
					}
				}
			})
			.finally(() => {
				if (!cancelled) {
					setLoading(false)
				}
			})

		return () => {
			cancelled = true
		}
	}, [q, scope, apiLastModified])

	const grouped = useMemo(() => groupResultsByType(results ?? []), [results])

	const scopeLabel = SEARCH_SCOPE_LABELS[scope] ?? scope
	const hasGroups = Object.values(grouped).some((items) => items.length > 0)

	return (
		<RedesignLayout title="Search">
			<div className="SearchResults">
				<div className="SearchResults-inner">
					<p className="SearchResults-back">
						<Link href={route('smart_fish.page')}>&larr; Back to homepage</Link>
					</p>

					<h1 className="SearchResults-heading">Search results</h1>

					<SearchForm initialQuery={q} initialScope={scope} compact />

					{q.length >= 2 && (
						<p className="SearchResults-meta">
							Showing results for <strong>&ldquo;{q}&rdquo;</strong> in{' '}
							<strong>{scopeLabel}</strong>
						</p>
					)}

					{q.length < 2 && (
						<p className="SearchResults-hint">
							Enter at least two characters to search waterbodies, species, or
							regions.
						</p>
					)}

					{loading && (
						<div className="SearchResults-loading">
							<LoadingSpinner />
						</div>
					)}

					{error && <p className="SearchResults-error">{error}</p>}

					{!loading && !error && q.length >= 2 && !hasGroups && (
						<p className="SearchResults-empty">
							No matches found. Try a different term or filter.
						</p>
					)}

					{!loading &&
						!error &&
						hasGroups &&
						Object.entries(grouped).map(([groupName, items]) =>
							items.length === 0 ? null : (
								<section key={groupName} className="SearchResults-group">
									<h2 className="SearchResults-groupTitle">{groupName}</h2>
									<ul className="SearchResults-list">
										{items.map((result) => (
											<li
												key={`${result.type}-${result.regionSlug}-${result.waterSlug ?? ''}-${result.speciesSlug ?? ''}`}
											>
												<Link
													href={buildRegulationUrl(result)}
													className="SearchResults-link"
												>
													<span className="SearchResults-label">
														{result.label}
													</span>
													<span className="SearchResults-badge">
														{resultTypeLabel(
															result.type,
															result.speciesName,
														)}
													</span>
												</Link>
											</li>
										))}
									</ul>
								</section>
							),
						)}
				</div>
			</div>
		</RedesignLayout>
	)
}

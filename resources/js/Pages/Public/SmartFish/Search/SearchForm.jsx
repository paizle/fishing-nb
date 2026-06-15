import './SearchForm.scss'
import { useState } from 'react'
import { router } from '@inertiajs/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import {
	SEARCH_SCOPE_LABELS,
	SEARCH_SCOPES,
	scopeFromTabIndex,
	tabIndexFromScope,
} from './searchHelpers'

export default function SearchForm({ initialQuery = '', initialScope = 'all', compact = false }) {
	const [query, setQuery] = useState(initialQuery)
	const [activeTab, setActiveTab] = useState(tabIndexFromScope(initialScope))

	const submit = (event) => {
		event?.preventDefault()
		const trimmed = query.trim()
		if (trimmed.length < 2) {
			return
		}

		const scope = scopeFromTabIndex(activeTab)
		router.get('/search', { q: trimmed, scope })
	}

	return (
		<div className={`SearchForm ${compact ? 'SearchForm--compact' : ''}`}>
			<div className="SearchForm-tabs" role="tablist" aria-label="Search filters">
				{SEARCH_SCOPES.map((scope, index) => (
					<button
						key={scope}
						type="button"
						role="tab"
						className={`SearchForm-tab ${activeTab === index ? 'is-active' : ''}`}
						aria-selected={activeTab === index}
						onClick={() => setActiveTab(index)}
					>
						{SEARCH_SCOPE_LABELS[scope]}
					</button>
				))}
			</div>

			<form className="SearchForm-search" onSubmit={submit}>
				<input
					type="search"
					className="SearchForm-input"
					placeholder="Search waterbodies, species, or regions…"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					aria-label="Search regulations"
					minLength={2}
				/>
				<button
					type="submit"
					className="SearchForm-searchBtn"
					disabled={query.trim().length < 2}
				>
					<MagnifyingGlassIcon aria-hidden="true" />
					Search
				</button>
			</form>
		</div>
	)
}

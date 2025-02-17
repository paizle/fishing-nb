import './Region.scss'
import React, { useState, useRef, useEffect } from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import { Link } from '@inertiajs/react'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'

export default function Region({ waters, breadcrumb }) {
	const results = waters

	const [filteredResults, setFilteredResults] = useState([])

	const [waterName, setWaterName] = useState('')

	const searchRef = useRef(null)

	const resultsRef = useRef(null)

	useEffect(() => {
		if (searchRef.current) {
			searchRef.current.focus()
		}
	}, [searchRef.current])

	const changeWaterName = (e) => {
		const value = e.target.value
		setWaterName(value)
		if (value.length) {
			const newFilteredResults = results.filter((result) =>
				result.water
					? result.water.name
							.toLowerCase()
							.includes(value.trim().toLowerCase())
					: false,
			)
			setFilteredResults(newFilteredResults)
		} else {
			setFilteredResults([])
		}
	}

	return (
		<PublicLayout>
			<header className="shadow">
				<PublicNav>
					<Breadcrumb breadcrumb={breadcrumb} />
				</PublicNav>
			</header>
			<main>
				<div className="Region">
					<div className="autocomplete">
						<header>
							<label>
								<span>Search by Waters</span>
								<input
									ref={searchRef}
									onChange={changeWaterName}
									placeholder='hint: Try searching "lake" or "stream"'
								/>
							</label>
						</header>
						<div
							className={`results ${filteredResults.length || waterName ? 'has-results' : null}`}
						>
							<ul ref={resultsRef} className={``}>
								{filteredResults.length
									? filteredResults.map((result) => (
											<li key={result.water.id}>
												<Link
													href={route(
														'location.water',
														{
															id: result.water.id,
														},
													)}
												>
													{result.water.name}
												</Link>
											</li>
										))
									: waterName && (
											<div className="p-4">
												(no results)
											</div>
										)}
							</ul>
						</div>
					</div>
				</div>
			</main>
		</PublicLayout>
	)
}

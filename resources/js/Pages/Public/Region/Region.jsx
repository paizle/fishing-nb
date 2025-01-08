import './Region.scss'
import React, {useState, useRef, useEffect} from 'react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout';
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb';
import { Link } from '@inertiajs/react'

export default function Region({ waters, breadcrumb }) {

    console.log(waters)
    
    const [results, setResults] = useState(waters)

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
        console.log(value)
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

    useEffect(() => {
        if (resultsRef.current) {
            const size = 28
            if (waterName && filteredResults.length === 0) {
                //resultsRef.current.style.height = size + 'px'
            } else {
                //resultsRef.current.style.height = filteredResults.length * size + 'px'
            }
        }
    }, [filteredResults, waterName])

    return (
        <PublicLayout>
            <header><Breadcrumb breadcrumb={breadcrumb} /></header>        
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
                        <ul
                            ref={resultsRef}
                            className={`results ${filteredResults.length || waterName ? 'has-results' : null}`}
                        >
                            {filteredResults.length ? (
                                filteredResults.map((result) =>
                                    result?.water ? (
                                        <li>
                                            <Link href={route('water.page', { id: result.water.id })}>
                                                {result.water.name}
                                            </Link>
                                        </li>
                                    ) : null,
                                )
                            ) : waterName ? (
                                <div>(no results)</div>
                            ) : null}
                        </ul>
                    </div>
                </div>
            </main>
        </PublicLayout>
    )
}

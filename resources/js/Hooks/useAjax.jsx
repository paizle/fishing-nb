import { useState, useRef, useCallback } from 'react'
import axios from 'axios'

export default function useAjax(url, transformer = (x) => x) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const inFlight = useRef(null)

	const load = useCallback(() => {
		if (data !== null) return Promise.resolve(data) // already fetched
		if (inFlight.current) return inFlight.current // return ongoing fetch

		setLoading(true)
		setError(null)

		inFlight.current = (async () => {
			try {
				const res = await axios.get(url)
				const transformed = transformer(res.data)
				setData(transformed)
				return transformed
			} catch (err) {
				setError(err)
				throw err
			} finally {
				setLoading(false)
				inFlight.current = null
			}
		})()

		return inFlight.current
	}, [data, url, transformer])

	return { data, loading, error, load }
}

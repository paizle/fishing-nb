import './Map.scss'
import { useState, useEffect } from 'react'
import useRest from '@/Hooks/useRest'
import MapMobile from './MapMobile'
import useApplicationContext from '@/Contexts/ApplicationContext'

export default function Map({ apiLastModified, selectRegion }) {
	const [regions, setRegions] = useState([])

	const appContext = useApplicationContext()

	//appContext.setUserSelectedRegion(null)

	const restRegions = useRest(apiLastModified)

	useEffect(() => {
		restRegions.get('/api/regions').then((request) => {
			const regions = request.data.regions.map((region) => {
				region.hasData = region.has_data
				return region
			})
			console.log(regions)
			setRegions(regions)
		})
	}, [])

	return (
		<div className="Map">
			<MapMobile locations={regions} onSelectLocation={selectRegion} />
		</div>
	)
}

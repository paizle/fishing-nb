import './Map.scss'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import MapMobile from './MapMobile'
import MapWeb from './MapWeb'
import SmartFishLayout from '@/Layouts/SmartFishLayout/SmartFishLayout'
import useLandingPage from '@/Hooks/useLandingPage'
import useApplicationContext from '@/Contexts/ApplicationContext'

export default function Map({ locations, breadcrumb }) {
	const appContext = useApplicationContext()

	appContext.setUserSelectedRegion()

	useLandingPage('location')

	locations = locations.map((location) => {
		location.hasData = location.has_data
		return location
	})

	return (
		<SmartFishLayout>
			<div className="Map">
				<MapMobile
					locations={locations}
					onSelectLocation={(id) => {
						appContext.setUserSelectedRegion(id)
						location.href = '/home'
					}}
				/>
			</div>
		</SmartFishLayout>
	)
}

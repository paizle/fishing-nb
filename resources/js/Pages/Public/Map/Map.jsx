import './Map.scss'
import useScreenOrientation from '@/Hooks/useScreenOrientation'
import MapMobile from './MapMobile'
import MapWeb from './MapWeb'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
import useLandingPage from '@/Hooks/useLandingPage'

export default function Map({ locations, breadcrumb }) {
	const screenOrientation = useScreenOrientation()

	useLandingPage('location')

	locations = locations.map((location) => {
		location.hasData = location.has_data
		return location
	})

	return (
		<PublicLayout className="Map">
			<header className="shadow">
				<PublicNav>
					<Breadcrumb breadcrumb={breadcrumb} />
				</PublicNav>
			</header>
			<main>
				{screenOrientation.isPortrait ? (
					<MapMobile locations={locations} />
				) : (
					<MapWeb locations={locations} />
				)}
			</main>
		</PublicLayout>
	)
}

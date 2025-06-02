import './SmartFishLayout.scss'
import PublicLayout from '../PublicLayout/PublicLayout'
import PublicNav from '../PublicLayout/PublicNav'
import SelectFish from './Components/SelectFish/SelectFish'

export default function SmartFishLayout({
	apiLastModified,
	selectedLocation,
	selectedFish,
	selectFish,
	children,
}) {
	return (
		<PublicLayout className={`SmartFishLayout ${selectedLocation ? 'sub-heading' : ''}`}>
			<header>
				<PublicNav>
					<h1 className="hero">
						Smart <span>Fish</span>
					</h1>
				</PublicNav>
			</header>
			<main>{children}</main>
			<footer>
				<SelectFish
					apiLastModified={apiLastModified}
					selectedLocation={selectedLocation}
					selectedFish={selectedFish}
					selectFish={selectFish}
				/>
			</footer>
		</PublicLayout>
	)
}

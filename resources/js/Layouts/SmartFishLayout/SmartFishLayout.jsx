import './SmartFishLayout.scss'
import PublicLayout from '../PublicLayout/PublicLayout'
import SiteHeader from '../SiteHeader/SiteHeader'
import SelectFish from './Components/SelectFish/SelectFish'

export default function SmartFishLayout({
	fishes,
	selectedLocation,
	selectedFish,
	selectFish,
	children,
}) {
	return (
		<PublicLayout className={`SmartFishLayout ${selectedLocation ? 'sub-heading' : ''}`}>
			<SiteHeader />
			<main>{children}</main>
			<footer>
				<SelectFish fishes={fishes} selectedFish={selectedFish} selectFish={selectFish} />
			</footer>
		</PublicLayout>
	)
}

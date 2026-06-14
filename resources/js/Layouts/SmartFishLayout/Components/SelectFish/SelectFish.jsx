import useApplicationContext from '@/Contexts/ApplicationContext'
import SelectFishDesktop from '@/Layouts/SmartFishLayout/Components/SelectFish/SelectFishDesktop/SelectFishDesktop'
import SelectFishMobile from '@/Layouts/SmartFishLayout/Components/SelectFish/SelectFishMobile/SelectFishMobile'

export default function SelectFish({ fishes = null, selectedFish, selectFish }) {
	const appContext = useApplicationContext()

	return appContext.screenOrientation.isMobile ? (
		<SelectFishMobile fishes={fishes} selectedFishId={selectedFish} selectFish={selectFish} />
	) : (
		<SelectFishDesktop fishes={fishes} selectedFishId={selectedFish} selectFish={selectFish} />
	)
}

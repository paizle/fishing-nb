import './WatersMap.scss'
import { useMemo, useState } from 'react'
import { Head } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import SiteHeader from '@/Layouts/SiteHeader/SiteHeader'
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'
import MapView from './nb-waters/Components/Map/MapView'
import Footer from './nb-waters/Components/Footer/Footer'
import SelectWater from './nb-waters/Components/SelectWater/SelectWater'
import useWaterIndex from './nb-waters/Hooks/useWaterIndex'

export default function WatersMap() {
	const { items, isLoading } = useWaterIndex()
	const [selectedId, setSelectedId] = useState(null)

	const selectedItem = useMemo(
		() => items.find((item) => item.id === selectedId) ?? null,
		[items, selectedId],
	)

	return (
		<PublicLayout className="WatersMap">
			<Head title="Waters Map" />
			<SiteHeader />
			<main>
				<div className="WatersMap-body">
					<MapView items={items} selectedItem={selectedItem} onSelect={setSelectedId} />
					<Footer>
						{isLoading ? (
							<div className="WatersMap-loading">
								<LoadingSpinner />
								<span>Loading waters…</span>
							</div>
						) : (
							<SelectWater
								items={items}
								selectedId={selectedId}
								onSelect={setSelectedId}
							/>
						)}
					</Footer>
				</div>
			</main>
		</PublicLayout>
	)
}

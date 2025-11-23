import './SmartFishLayout.scss'
import PublicLayout from '../PublicLayout/PublicLayout'
import PublicNav from '../PublicLayout/PublicNav'
import SelectFish from './Components/SelectFish/SelectFish'

const yana = (b) => {
	return b ? 'ya' : 'na'
}

const renderWizardState = (wizardState) => {
	return (
		<>
			<div>mapFocus: {yana(wizardState.mapFocus)}</div>
			<div>comboboxFocus: {yana(wizardState.comboboxFocus)}</div>
			<div>comboboxList: {yana(wizardState.comboboxList)}</div>
		</>
	)
}

export default function SmartFishLayout({
	apiLastModified,
	shrink,
	selectedLocation,
	selectedFish,
	selectFish,
	children,
}) {
	return (
		<PublicLayout className={`SmartFishLayout ${shrink ? '' : 'sub-heading'}`}>
			<header>
				<PublicNav>
					{/*
          <div className="flex gap-4">
          {wizard.getWizardStep().name}
          {renderWizardState(wizard.wizardState)}
          </div>
          */}

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

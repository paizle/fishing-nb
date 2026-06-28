import './Settings.scss'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import SiteHeader from '@/Layouts/SiteHeader/SiteHeader'
import useApplicationContext from '@/Contexts/ApplicationContext'

export default function Settings() {
	const appContext = useApplicationContext()
	const settings = appContext.getSettings()

	const handleChange = (event) => {
		const element = event.currentTarget
		const value = element.type === 'checkbox' ? element.checked : element.value
		appContext.updateSetting(element.name, value)
	}

	return (
		<PublicLayout>
			<SiteHeader />
			<main>
				<div className="Settings">
					<h1 className="BladePage-title">Settings</h1>
					<label>
						<input
							type="checkbox"
							onChange={handleChange}
							name="gradientBackground"
							checked={settings.gradientBackground}
							value={true}
						/>
						Gradient Background
					</label>
				</div>
			</main>
		</PublicLayout>
	)
}

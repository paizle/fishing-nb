import './Settings.scss'
import PublicLayout from '@/Layouts/PublicLayout/PublicLayout'
import PublicNav from '@/Layouts/PublicLayout/PublicNav'
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
			<header className="shadow">
				<PublicNav>Settings</PublicNav>
			</header>
			<main>
				<div className="Settings">
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

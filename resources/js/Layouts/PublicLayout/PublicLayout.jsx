import './PublicLayout.scss'
import { useApplicationContext } from '@/Contexts/ApplicationContext'

export default function PublicLayout({ className = '', children }) {
	const appContext = useApplicationContext()

	const settings = appContext.getSettings()

	return (
		<div
			className={`PublicLayout ${className} ${settings.gradientBackground ? 'gradient-background' : ''}`}
		>
			{children}
		</div>
	)
}

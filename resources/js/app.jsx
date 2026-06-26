import '../css/app.scss'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import { ApplicationContextProvider } from '@/Contexts/ApplicationContext'
import DevSpaToggle from '@/Components/DevSpaToggle/DevSpaToggle'

const appName = import.meta.env.VITE_APP_NAME || 'Smart Fish'

createInertiaApp({
	title: (title) =>
		title ? `${title} · ${appName}` : `${appName} — New Brunswick Fishing Regulations`,
	resolve: (name) =>
		resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
	setup({ el, App, props }) {
		const root = createRoot(el)
		const devSpaToggle = props.initialPage?.props?.devSpaToggle ?? false
		root.render(
			<ApplicationContextProvider {...props}>
				<App {...props} />
				<DevSpaToggle enabled={devSpaToggle} />
			</ApplicationContextProvider>,
		)
	},
	progress: {
		color: '#70b9b0',
	},
})

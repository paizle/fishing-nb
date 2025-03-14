import '../css/app.scss'
import './bootstrap'

import { scan } from 'react-scan' // must be imported before React and React DOM

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import { ApplicationContextProvider } from '@/Contexts/ApplicationContext'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

scan({
	enabled: false,
})

createInertiaApp({
	title: (title) => `${appName}`,
	resolve: (name) =>
		resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
	setup({ el, App, props }) {
		const root = createRoot(el)
		root.render(
			<ApplicationContextProvider>
				<App {...props} />
			</ApplicationContextProvider>,
		)
	},
	progress: {
		color: '#70b9b0',
	},
})

import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vitest/config'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [
		laravel({
			input: 'resources/js/app.jsx',
			refresh: true,
		}),
		react(),
		svgr(),
	],
	test: {
		environment: 'node',
		include: ['resources/js/**/*.test.ts'],
	},
})

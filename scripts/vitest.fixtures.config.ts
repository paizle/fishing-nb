import { mergeConfig } from 'vitest/config'
import base from '../vite.config.js'

export default mergeConfig(base, {
	test: {
		include: ['scripts/export-restriction-fixtures.ts'],
		environment: 'node',
	},
})

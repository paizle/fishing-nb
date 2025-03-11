import react from 'eslint-plugin-react'
import globals from 'globals'

// Clean the globals object by trimming any leading/trailing spaces in keys
const cleanedGlobals = Object.fromEntries(
	Object.entries(globals.browser).map(([key, value]) => [
		key.trim(), // Trim any leading/trailing spaces
		value,
	]),
)

export default [
	{
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		plugins: {
			react,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: { ...cleanedGlobals },
		},
		rules: {
			// ... any rules you want
			'react/jsx-uses-react': 'error',
			'react/jsx-uses-vars': 'error',
			'max-len': ['error', { code: 100 }],
		},
		// ... others are omitted for brevity
	},
]

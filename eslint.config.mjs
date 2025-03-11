import tsEslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      '@typescript-eslint': tsEslint,
    },
    rules: {
      'react/jsx-uses-react': 'off', // React 17+ no longer requires React in scope
      'react/react-in-jsx-scope': 'off', // React 17+ no longer requires React in scope
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';  // Import the parser correctly

export default [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: parser, // Ensure the parser is correctly set
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      '@typescript-eslint': eslintPluginTypescript,
    },
    rules: {
      'react/jsx-uses-react': 'off', // React 17+ no longer requires React in scope
      'react/react-in-jsx-scope': 'off', // React 17+ no longer requires React in scope
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];

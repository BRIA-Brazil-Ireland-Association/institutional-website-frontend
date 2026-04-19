import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const nextConfig = require('eslint-config-next');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const tanstackPlugin = require('@tanstack/eslint-plugin-query');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');

const isProduction = process.env.NODE_ENV === 'production';

export default [
	{ ignores: ['eslint.config.mjs', '.next/**', 'node_modules/**'] },
	...nextConfig,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: isProduction ? './tsconfig.json' : false,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			prettier: prettierPlugin,
			'@tanstack/query': tanstackPlugin,
			'unused-imports': unusedImportsPlugin,
		},
		settings: {
			'import/resolver': {
				typescript: isProduction
					? { project: ['tsconfig.json'] }
					: { alwaysTryTypes: true },
			},
			'import/internal-regex': '^(components|theme)',
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...tanstackPlugin.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'off',
			'unused-imports/no-unused-imports': 'error',
			'prettier/prettier': 'error',
			'react/react-in-jsx-scope': 'off',
			'import/no-anonymous-default-export': 'off',
			'react/prop-types': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
	},
	prettierConfig,
];

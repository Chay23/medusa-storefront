import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		files: ['**/*.{js,ts,jsx,tsx}'],
		plugins: {
			import: importPlugin,
		},
		rules: {
			'import/order': [
				'error',
				{
					groups: [
						'type',
						'builtin',
						'external',
						'internal',
						['parent', 'sibling', 'index'],
						'object',
					],
					pathGroups: [
						{
							pattern: 'react',
							group: 'external',
							position: 'before',
						},
						{
							pattern: 'next/**',
							group: 'external',
							position: 'before',
						},
						{
							pattern: '@/**',
							group: 'internal',
						},
					],
					pathGroupsExcludedImportTypes: ['react', 'next'],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
		},
	},
];

export default eslintConfig;

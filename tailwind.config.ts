import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				surface: 'var(--surface)',
			},
		},
	},
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: '#607D4A',
						},
					},
				},
				dark: {
					colors: {
						primary: {
							foreground: '#FFFFFF',
							DEFAULT: '#607D4A',
						},
					},
				},
			},
		}),
	],
} satisfies Config;

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
				primary: 'var(--primary)',
				'primary-100': 'var(--primary-100)',
				'primary-200': 'var(--primary-200)'

			},
		},
	},
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: 'var(--primary)',
						},
					},
				},
				dark: {
					colors: {
						primary: {
							foreground: '#FFFFFF',
							DEFAULT: 'var(--primary)',
						},
					},
				},
			},
		}),
	],
} satisfies Config;

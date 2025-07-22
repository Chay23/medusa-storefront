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
				loading: 'var(--loading)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				'text-secondary': 'var(--text-secondary)',
				'primary-100': 'var(--primary-100)',
				'primary-200': 'var(--primary-200)',
				'surface-border': 'var(--surface-border)',
				'input-border': 'var(--input-border)',
				'danger-500': 'var(--danger-500)',
				'success-500': 'var(--success-500)',
				'warning-500': 'var(--warning-500)',
				'default-500': 'var(--default-500)',
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
						secondary: {
							DEFAULT: 'var(--secondary)',
						},
					},
				},
				dark: {
					colors: {
						primary: {
							foreground: '#FFFFFF',
							DEFAULT: 'var(--primary)',
						},
						secondary: {
							DEFAULT: 'var(--secondary)',
						},
					},
				},
			},
		}),
	],
} satisfies Config;

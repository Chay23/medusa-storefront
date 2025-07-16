import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';
import { Providers } from './providers';

import '../styles/globals.css';

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Dashboard page',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${roboto.className} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

'use client';

import { useRouter } from 'next/navigation';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';

declare module '@react-types/shared' {
	interface RouterConfig {
		routerOptions: NonNullable<
			Parameters<ReturnType<typeof useRouter>['push']>[1]
		>;
	}
}

export function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	return (
		<ThemeProvider>
			<HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>
		</ThemeProvider>
	);
}

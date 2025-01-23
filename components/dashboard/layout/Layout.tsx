'use client';

import type { ReactNode } from 'react';
import Sidebar from '../UI/sidebar/Sidebar';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='flex h-screen overflow-hidden'>
			<Sidebar />
			<main className='p-9 w-full bg-background'>{children}</main>
		</div>
	);
}

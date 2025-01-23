'use client';

import type { ReactNode } from 'react';
import Sidebar from '../UI/sidebar/main/Sidebar';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='flex h-screen overflow-hidden'>
			<Sidebar />
			<main>{children}</main>
		</div>
	);
}

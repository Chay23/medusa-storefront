'use client';

import type { ReactNode } from 'react';

import Sidebar from '../UI/sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<div className='flex h-screen overflow-hidden'>
				<Sidebar />
				<main className='p-9 w-full bg-background overflow-auto'>{children}</main>
			</div>
			<Toaster position='bottom-right' />
		</>
	);
}

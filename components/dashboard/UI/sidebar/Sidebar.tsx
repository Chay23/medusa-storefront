import React, { ReactNode } from 'react';

import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Sidebar({}) {
	return (
		<section className='w-[300px] flex flex-col justify-between px-6 py-4 border-r bg-background'>
			<div className='flex flex-col gap-9'>
				<Header />
				<Navigation />
			</div>
			<Footer />
		</section>
	);
}

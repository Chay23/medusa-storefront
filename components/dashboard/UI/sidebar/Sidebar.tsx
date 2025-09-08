import React, { memo, Suspense } from 'react';

import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';
import { NavigationSkeleton } from './skeleton/navigation.skeleton';

const Sidebar = memo(function _SideBar() {
	return (
		<section className='w-[300px] flex flex-col justify-between px-6 py-4 border-r border-divider bg-background'>
			<div className='flex flex-col gap-9'>
				<Header />
				<Suspense fallback={<NavigationSkeleton />}>
					<Navigation />
				</Suspense>
			</div>
			<Footer />
		</section>
	);
});

export default Sidebar;

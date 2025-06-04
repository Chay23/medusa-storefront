'use client';

import SearchFilter from '../../common/filters/SearchFilter';

export default function CategoriesFilters() {
	return (
		<div className='flex gap-4 justify-between items-center mb-6'>
			<div className='flex gap-3 items-center'></div>
			<SearchFilter placeholder='Search' />
		</div>
	);
}

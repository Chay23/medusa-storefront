'use client';

import { Filter as FilterIcon } from 'lucide-react';

import { DAY_OPTIONS_1 } from '@/lib/dashboard/constants';

import DateFilter from '../../common/filters/DateFilter';
import SearchFilter from '../../common/filters/SearchFilter';

export default function CollectionTableFilters({}) {
	return (
		<div className='flex gap-4 justify-between items-center mb-3'>
			<div className='flex gap-3 items-center'>
				<FilterIcon />
				<DateFilter
					title='Created'
					paramName='created_at'
					dayOptions={DAY_OPTIONS_1}
				/>
				<DateFilter
					title='Updated'
					paramName='updated_at'
					dayOptions={DAY_OPTIONS_1}
				/>
			</div>
			<SearchFilter placeholder='Search' />
		</div>
	);
}

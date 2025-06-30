import DateFilter from '../../common/filters/DateFilter';
import SearchFilter from '../../common/filters/SearchFilter';
import { DAY_OPTIONS_1 } from '@/lib/dashboard/constants';

import { Filter } from 'lucide-react';

export default function CollectionsFilters({}) {
	return (
		<div className='flex gap-4 justify-between items-center mb-6'>
			<div className='flex gap-3 items-center'>
				<Filter />
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

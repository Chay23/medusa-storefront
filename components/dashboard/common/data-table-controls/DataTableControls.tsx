'use client';

import type { UI } from '@/types/ui';

import { useShallowRemoveParams } from '@/hooks/useShallowRemoveParams';

import DataTableFilters from './filters/DataTableFilters';
import DataTableSearch from './DataTableSearch';
import { Button } from '@heroui/button';
import SortIcon from '@mui/icons-material/Sort';

type Props = {
	includeSearch: boolean;
	filters: UI.Filter[];
	invalidParams: string[];
	searchPlaceholder?: string;
};

export default function DataTableControls({
	includeSearch = true,
	filters,
	invalidParams,
	searchPlaceholder = '',
}: Props) {
	useShallowRemoveParams(invalidParams);

	return (
		<div className='flex justify-between gap-2'>
			<DataTableFilters filters={filters} invalidParams={invalidParams} />
			<div className='flex gap-2'>
				{includeSearch && <DataTableSearch placeholder={searchPlaceholder} />}
				<Button isIconOnly>
					<SortIcon />
				</Button>
			</div>
		</div>
	);
}

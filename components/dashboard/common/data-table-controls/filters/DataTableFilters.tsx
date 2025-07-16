'use client';

import type { UI } from '@/types/ui';

import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { getInitialFilters, removeAllFilterParams } from './utils';

import { TableFiltersContext } from './context';
import CloseIcon from '@mui/icons-material/Close';
import Add from '@mui/icons-material/Add';
import SearchFilter from '../DataTableSearch';
import SelectFilter from './types/SelectFilter';
import DateFilter from './types/DateFilter';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/react';

type Props = {
	filters: UI.Filter[];
	invalidParams: string[];
	includeSearch?: boolean;
};

export default function DataTableFilters({
	filters,
	invalidParams,
	includeSearch = false,
}: Props) {
	const searchParams = useSearchParams();
	const { updateParams } = useUpdateParams();
	const [activeFilters, setActiveFilters] = useState<UI.Filter[]>(
		getInitialFilters({ searchParams, filters, invalidParams })
	);

	const handleAddFilter = (filter: UI.Filter) => {
		return () =>
			setActiveFilters((prevState) => [
				...prevState,
				{ ...filter, openOnMount: true },
			]);
	};

	const availableFilters = filters.filter(
		(f) => !activeFilters.find((af) => af.key === f.key)
	);

	const removeAllFilters = useCallback(() => {
		setActiveFilters([]);
		const removedParams = removeAllFilterParams(filters);
		updateParams(removedParams);
	}, []);

	const removeFilter = (key: string) => {
		setActiveFilters((prevState) => prevState.filter((f) => f.key !== key));
	};

	const contextValue = useMemo(
		() => ({ removeFilter, removeAllFilters }),
		[removeFilter, removeAllFilters]
	);

	return (
		<TableFiltersContext.Provider value={contextValue}>
			<div className='flex gap-4 justify-between mb-3'>
				<div className='flex gap-3 flex-wrap'>
					{activeFilters.map((filter) => {
						switch (filter.type) {
							case 'select': {
								return <SelectFilter key={filter.key} filter={filter} />;
							}
							case 'date': {
								return <DateFilter key={filter.key} filter={filter} />;
							}
						}
					})}
					{availableFilters.length > 0 && (
						<Dropdown>
							<DropdownTrigger>
								<Button startContent={<Add />}>Add Filter</Button>
							</DropdownTrigger>
							<DropdownMenu items={availableFilters}>
								{(filter) => (
									<DropdownItem
										key={filter.key}
										onPress={handleAddFilter(filter)}
									>
										{filter.label}
									</DropdownItem>
								)}
							</DropdownMenu>
						</Dropdown>
					)}
					{activeFilters.length > 0 && (
						<Button
							startContent={<CloseIcon sx={{ fontSize: 20 }} />}
							variant='light'
							onPress={removeAllFilters}
						>
							Clear All
						</Button>
					)}
				</div>
				{includeSearch && <SearchFilter placeholder='Search' />}
			</div>
		</TableFiltersContext.Provider>
	);
}

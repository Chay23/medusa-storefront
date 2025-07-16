'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@heroui/input';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
	placeholder?: string;
};

export default function DataTableSearch({ placeholder = 'Search' }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

	const handleSearchChange = (value: string) => {
		setSearchValue(() => value);
		handleParamChange(value);
	};

	const handleParamChange = useDebouncedCallback((value: string) => {
		const params = new URLSearchParams(searchParams);
		value ? params.set('q', value) : params.delete('q');
		router.replace(`?${params}`);
	}, 200);

	return (
		<Input
			startContent={<SearchIcon />}
			className='self-start border border-input-border rounded-xl w-fit'
			placeholder={placeholder}
			value={searchValue}
			onValueChange={handleSearchChange}
		/>
	);
}

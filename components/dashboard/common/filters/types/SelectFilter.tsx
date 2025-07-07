'use client';

import type { UI } from '@/types/ui';

import {
	Button,
	ButtonGroup,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Selection,
} from '@heroui/react';
import { useMemo, useState } from 'react';
import { useTableFilterContext } from '../context';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

const getInitialValue = ({
	searchParams,
	filter,
}: {
	searchParams: ReadonlyURLSearchParams;
	filter: UI.Filter;
}): Selection => {
	const keys = searchParams.get(filter.key)?.split(',');
	if (keys) {
		return new Set(keys);
	}

	return new Set();
};

type Props = {
	filter: UI.SelectFilter;
};

export default function SelectFilter({ filter }: Props) {
	const searchParams = useSearchParams();
	const [isOpen, setOpen] = useState(filter.openOnMount);
	const [selectedKeys, setSelectedKeys] = useState<Selection>(
		getInitialValue({ searchParams, filter })
	);
	const { removeFilter } = useTableFilterContext();
	const { updateParams } = useUpdateParams();

	const selectedValue = useMemo(
		() =>
			Array.from(selectedKeys)
				.map((k) => filter.options.find((f) => f.key === k)?.label)
				.filter(Boolean)
				.join(', '),
		[selectedKeys]
	);

	const handleOpenChange = (openState: boolean) => {
		if (!openState && !selectedValue) {
			removeFilter(filter.key);
		}
		setOpen(openState);
	};

	const handleRemoveFilter = () => {
		updateParams({
			[filter.key]: null,
		});
		removeFilter(filter.key);
	};

	const handleSelectionChange = (key: Selection) => {
		updateParams({
			[filter.key]: Array.from(key).join(','),
		});
		setSelectedKeys(key);
	};

	return (
		<Dropdown
			isOpen={isOpen}
			onOpenChange={handleOpenChange}
			placement='bottom-start'
			closeOnSelect={false}
		>
			<ButtonGroup>
				<Button className='border-r border-input-border min-w-0'>
					{filter.label}
				</Button>
				<DropdownTrigger>
					<Button className='min-w-0'>{selectedValue}</Button>
				</DropdownTrigger>
				{selectedValue.length > 0 && (
					<Button className='px-2 min-w-0' onPress={handleRemoveFilter}>
						<CloseIcon sx={{ fontSize: 20 }} />
					</Button>
				)}
			</ButtonGroup>
			<DropdownMenu
				items={filter.options}
				selectionMode={filter.selectionMode}
				selectedKeys={selectedKeys}
				onSelectionChange={handleSelectionChange}
			>
				{(option) => (
					<DropdownItem key={option.key}>{option.label}</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
}

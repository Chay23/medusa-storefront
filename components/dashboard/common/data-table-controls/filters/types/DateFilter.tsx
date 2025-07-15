'use client';

import type { ChangeEvent } from 'react';
import type { UI } from '@/types/ui';

import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { formatFiltersDate } from '@/lib/dashboard/utils/date';
import { useTableFilterContext } from '../context';

import CloseIcon from '@mui/icons-material/Close';
import {
	Button,
	ButtonGroup,
	cn,
	DatePicker,
	DateValue,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Select,
	SelectItem,
} from '@heroui/react';

type Props = {
	filter: UI.DateFilter;
};

export default function DateFilter({ filter }: Props) {
	const searchParams = useSearchParams();
	const [isOpen, setIsOpen] = useState(filter.openOnMount);
	const [option, setOption] = useState('');
	const [showCustomOption, setShowCustomOption] = useState(false);
	const { removeFilter } = useTableFilterContext();
	const { updateParams } = useUpdateParams();

	const defaultOptions = useMemo(
		() => [
			...filter.dayOptions.map((day) => ({
				key: day,
				title: `Last ${day} days`,
			})),
			{
				key: 'custom',
				title: 'Custom',
			},
		],
		[]
	);

	useEffect(() => {
		const param = searchParams.get(filter.key);
		if (param) {
			const paramObj = JSON.parse(param);
			const dateFrom = paramObj['$gte'];
			const dateTo = paramObj['$lte'];

			if (dateTo) {
				setOption('custom');
				return setShowCustomOption(true);
			}

			if (dateFrom) {
				const dateGte = parseDate(dateFrom);
				const date = today(getLocalTimeZone()).subtract({ days: dateGte.day });

				if (filter.dayOptions.includes(date.day)) {
					return setOption(date.day.toString());
				}

				setOption('custom');
				setShowCustomOption(true);
			}
		}
	}, []);

	const getDateRange = () => {
		const param = searchParams.get(filter.key);
		if (param) {
			const paramObj = JSON.parse(param);
			const dateFrom = paramObj['$gte'];
			const dateTo = paramObj['$lte'];
			if (dateTo && dateFrom) {
				return `${formatFiltersDate(dateFrom)} - ${formatFiltersDate(dateTo)}`;
			}

			if (dateFrom) {
				return formatFiltersDate(dateFrom);
			}

			if (dateTo) {
				return formatFiltersDate(dateTo);
			}
		}
	};

	const getDate = (dateKey: string) => {
		const param = searchParams.get(filter.key);
		if (param) {
			const paramObj = JSON.parse(param);
			const date = paramObj[dateKey];
			return date ? parseDate(paramObj[dateKey]) : null;
		}
		return null;
	};

	const clearParams = () => {
		updateParams({
			[filter.key]: null,
		});
	};

	const handleOpenChange = (openState: boolean) => {
		if (!openState && !option) {
			removeFilter(filter.key);
		}

		setIsOpen(openState);
	};

	const handleDateChange = (filterOption: string) => {
		return (date: DateValue | null) => {
			if (date) {
				const param = searchParams.get(filter.key);
				if (param) {
					const paramObj = JSON.parse(param);
					const updatedParamValue = {
						...paramObj,
						[filterOption]: date.toString(),
					};
					updateParams({ [filter.key]: JSON.stringify(updatedParamValue) });
					return;
				}
				const updatedParamValue = { [filterOption]: date.toString() };
				updateParams({ [filter.key]: JSON.stringify(updatedParamValue) });
			}
		};
	};

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;

		if (value) {
			setOption(value);

			if (value === 'custom') {
				clearParams();
				return setShowCustomOption(true);
			}

			setShowCustomOption(false);

			const date = today(getLocalTimeZone()).subtract({
				days: parseInt(value),
			});

			const param = searchParams.get(filter.key);

			if (param) {
				const paramObj = JSON.parse(param) as { $gte?: string; $lte?: string };
				if ('$lte' in paramObj) {
					delete paramObj['$lte'];
				}
			}
			const updatedParamValue = { $gte: date.toString() };

			return updateParams({
				[filter.key]: JSON.stringify(updatedParamValue),
			});
		}

		clearParams();
	};

	const handleRemoveFilter = () => {
		clearParams();
		removeFilter(filter.key);
	};

	return (
		<div className='flex items-center gap-1'>
			<Dropdown
				isOpen={isOpen}
				placement='bottom-start'
				closeOnSelect={false}
				onOpenChange={handleOpenChange}
			>
				<ButtonGroup>
					<Button>{filter.label}</Button>
					<DropdownTrigger>
						<Button>{getDateRange()}</Button>
					</DropdownTrigger>
					{option && (
						<Button className='px-2 min-w-0' onPress={handleRemoveFilter}>
							<CloseIcon sx={{ fontSize: 20 }} />
						</Button>
					)}
				</ButtonGroup>
				<DropdownMenu>
					<DropdownSection className={cn('mb-0')}>
						<DropdownItem
							key='created'
							className={cn('!bg-transparent !hover:bg-transparent p-0')}
							textValue='Created select'
						>
							<Select
								aria-label='Created select options'
								label=''
								labelPlacement='outside'
								placeholder='Select date'
								className='min-w-[200px]'
								size='md'
								defaultSelectedKeys={[option]}
								value={option}
								onChange={handleOptionChange}
							>
								{defaultOptions.map(({ key, title }) => (
									<SelectItem key={key}>{title}</SelectItem>
								))}
							</Select>
						</DropdownItem>
					</DropdownSection>
					<DropdownSection hidden={!showCustomOption} className={cn('mt-2')}>
						<DropdownItem
							key='custom-from'
							textValue='Created from'
							className={cn('!bg-transparent !hover:bg-transparent p-0')}
						>
							<DatePicker
								label='From'
								labelPlacement='outside'
								value={getDate('$gte')}
								onChange={handleDateChange('$gte')}
								disableAnimation
							/>
						</DropdownItem>
						<DropdownItem
							key='custom-to'
							textValue='Created to'
							className={cn('!bg-transparent !hover:bg-transparent p-0 mt-2')}
						>
							<DatePicker
								label='To'
								labelPlacement='outside'
								value={getDate('$lte')}
								onChange={handleDateChange('$lte')}
								disableAnimation
							/>
						</DropdownItem>
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}

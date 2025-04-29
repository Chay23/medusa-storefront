import type { ChangeEvent } from 'react';

import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
	Button,
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

import { X } from 'lucide-react';

type Props = {
	title: string;
	paramName: string;
	dayOptions: number[];
};

export default function DateFilter({ title, paramName, dayOptions }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [option, setOption] = useState('');
	const [showCustomOption, setShowCustomOption] = useState(false);

	const defaultOptions = useMemo(
		() => [
			...dayOptions.map((day) => ({
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
		const dateFrom = searchParams.get(`${paramName}[$gte]`);
		const dateTo = searchParams.get(`${paramName}[$lte]`);

		if (dateTo) {
			setOption('custom');
			return setShowCustomOption(true);
		}

		if (dateFrom) {
			const dateGte = parseDate(dateFrom);
			const date = today(getLocalTimeZone()).subtract({ days: dateGte.day });

			if (dayOptions.includes(date.day)) {
				return setOption(date.day.toString());
			}

			setOption('custom');
			setShowCustomOption(true);
		}
	}, []);

	const formatDate = (dateStr: string) => {
		const date = parseDate(dateStr);
		const jsDate = date.toDate(getLocalTimeZone());
		const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
			jsDate
		);
		return `${month} ${date.day}, ${date.year}`;
	};

	const getDateRange = () => {
		const dateFrom = searchParams.get(`${paramName}[$gte]`);
		const dateTo = searchParams.get(`${paramName}[$lte]`);

		if (dateTo && dateFrom) {
			const dateFromStr = formatDate(dateFrom);
			const dateToStr = formatDate(dateTo);
			return `${dateFromStr} - ${dateToStr}`;
		}

		if (dateFrom) {
			const dateFromStr = formatDate(dateFrom);
			return dateFromStr;
		}

		if (dateTo) {
			const dateToStr = formatDate(dateTo);
			return dateToStr;
		}
	};

	const getDate = (param: string) => {
		const date = searchParams.get(param);
		return date ? parseDate(date) : null;
	};

	const handleCreatedToDateChange = (date: DateValue | null) => {
		if (date) {
			const params = new URLSearchParams(searchParams);
			params.set(`${paramName}[$lte]`, `${date}`);
			router.replace(`?${params}`);
		}
	};

	const handleCreatedFromDateChange = (date: DateValue | null) => {
		if (date) {
			const params = new URLSearchParams(searchParams);
			params.set(`${paramName}[$gte]`, `${date}`);
			router.replace(`?${params}`);
		}
	};

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		const params = new URLSearchParams(searchParams);

		if (value) {
			setOption(value);

			if (value === 'custom') {
				params.delete(`${paramName}[$gte]`);
				params.delete(`${paramName}[$lte]`);
				router.replace(`?${params}`);
				return setShowCustomOption(true);
			}

			setShowCustomOption(false);

			const date = today(getLocalTimeZone()).subtract({
				days: parseInt(value),
			});

			params.delete(`${paramName}[$lte]`);
			params.set(`${paramName}[$gte]`, `${date}`);
			return router.replace(`?${params}`);
		}

		params.delete(`${paramName}[$gte]`);
		params.delete(`${paramName}[$lte]`);
		router.replace(`?${params}`);
	};

	const handleParamsClear = () => {
		const params = new URLSearchParams(searchParams);
		params.delete(`${paramName}[$gte]`);
		params.delete(`${paramName}[$lte]`);
		setShowCustomOption(false);
		setOption('');
		router.replace(`?${params}`);
	};

	return (
		<div className='flex items-center gap-1'>
			<Dropdown
				placement='bottom-start'
				closeOnSelect={false}
				data-open='false'
			>
				<DropdownTrigger>
					<Button
						startContent={
							<div>
								{title}
								{option && ':'}
							</div>
						}
					>
						{getDateRange()}
					</Button>
				</DropdownTrigger>
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
								value={getDate(`${paramName}[$gte]`)}
								onChange={handleCreatedFromDateChange}
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
								value={getDate(`${paramName}[$lte]`)}
								onChange={handleCreatedToDateChange}
							/>
						</DropdownItem>
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>
			{option && (
				<Button
					onPress={handleParamsClear}
					isIconOnly
					className={cn('min-w-5 w-5 min-h-5 h-5 rounded-full')}
				>
					<X size={14} />
				</Button>
			)}
		</div>
	);
}

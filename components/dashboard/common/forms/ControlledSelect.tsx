import { memo } from 'react';

import { Select, SelectItem, SelectProps } from '@heroui/select';
import {
	Controller,
	ControllerProps,
	ControllerRenderProps,
	FieldValues,
} from 'react-hook-form';

import type { UI } from '@/types/ui';
import type {
	MakeOptional,
	MakeRequired,
	Prettify,
} from '@/types/utils/common';

type Props<T extends FieldValues> = Prettify<
	MakeRequired<Omit<ControllerProps<T>, 'render'>, 'control'>
> &
	MakeOptional<
		Omit<SelectProps, keyof ControllerRenderProps | 'isInvalid' | 'items'>,
		'children'
	> & {
		options: UI.SelectOption[];
	};
function ControlledSelect<T extends FieldValues>({
	control,
	label,
	labelPlacement,
	options,
	name,
	className,
	children,
	...props
}: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			{...props}
			render={({
				field: { name, value, onChange, disabled, ref },
				fieldState: { invalid, error },
			}) => {
				return (
					<Select
						label={label}
						labelPlacement={labelPlacement ?? 'outside'}
						name={name}
						isInvalid={invalid}
						errorMessage={error?.message}
						disabled={disabled}
						value={value}
						onChange={onChange}
						defaultSelectedKeys={[value]}
						ref={ref}
						className={className}
						items={options}
						{...props}
					>
						{children ? (
							children
						) : (
							<>
								{(option: UI.SelectOption) => (
									<SelectItem key={option.key}>{option.label}</SelectItem>
								)}
							</>
						)}
					</Select>
				);
			}}
		/>
	);
}

export default memo(ControlledSelect) as typeof ControlledSelect;

import { memo } from 'react';

import { Input, InputProps } from '@heroui/input';
import {
	Controller,
	ControllerProps,
	ControllerRenderProps,
	FieldValues,
} from 'react-hook-form';

import { MakeRequired, Prettify } from '@/types/utils/common';

type Props<T extends FieldValues> = Prettify<
	MakeRequired<Omit<ControllerProps<T>, 'render'>, 'control'>
> &
	Omit<InputProps, keyof ControllerRenderProps | 'isInvalid'>;

function ControlledInput<T extends FieldValues>({
	control,
	name,
	label,
	labelPlacement,
	className,
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
					<Input
						label={label}
						labelPlacement={labelPlacement ?? 'outside'}
						name={name}
						isInvalid={invalid}
						errorMessage={error?.message}
						value={value}
						onChange={onChange}
						disabled={disabled}
						className={className}
						ref={ref}
						{...props}
					/>
				);
			}}
		/>
	);
}

export default memo(ControlledInput) as typeof ControlledInput;

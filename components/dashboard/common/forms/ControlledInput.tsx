import { Key, memo, RefCallback, RefObject } from 'react';

import { Input, InputProps } from '@heroui/input';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

import { MakeRequired, Prettify } from '@/types/utils/common';

type Props<T extends FieldValues> = Prettify<
	MakeRequired<Omit<ControllerProps<T>, 'render'>, 'control'> &
		InputProps & {
			controllerKey?: Key | null;
			ref?: RefObject<HTMLInputElement> | RefCallback<HTMLInputElement>;
		}
>;

function ControlledInput<T extends FieldValues>({
	control,
	name,
	label,
	labelPlacement,
	className,
	defaultValue,
	disabled,
	controllerKey,
	rules,
	shouldUnregister,
	ref,
	...props
}: Props<T>) {
	return (
		<Controller
			key={controllerKey}
			control={control}
			name={name}
			defaultValue={defaultValue}
			disabled={disabled}
			rules={rules}
			shouldUnregister={shouldUnregister}
			render={({
				field: { name, value, onChange, disabled },
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

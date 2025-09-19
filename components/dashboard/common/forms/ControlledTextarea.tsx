import { Key, memo, RefCallback, RefObject } from 'react';

import { Textarea, TextAreaProps } from '@heroui/input';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

import type { MakeRequired, Prettify } from '@/types/utils/common';

type Props<T extends FieldValues> = Prettify<
	MakeRequired<Omit<ControllerProps<T>, 'render'>, 'control'> &
		Omit<TextAreaProps, 'isInvalid' | 'disabled'> & {
			controllerKey?: Key | null;
			ref?: RefObject<HTMLTextAreaElement> | RefCallback<HTMLTextAreaElement>;
		}
>;

function ControlledTextarea<T extends FieldValues>({
	control,
	name,
	label,
	labelPlacement,
	className,
	controllerKey,
	defaultValue,
	disabled,
	shouldUnregister,
	rules,
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
			}) => (
				<Textarea
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
			)}
		/>
	);
}

export default memo(ControlledTextarea) as typeof ControlledTextarea;

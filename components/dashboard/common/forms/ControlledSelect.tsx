import { Key, memo, RefCallback, RefObject } from 'react';

import { Select, SelectItem, SelectProps } from '@heroui/select';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

import type { UI } from '@/types/ui';
import type {
	MakeOptional,
	MakeRequired,
	Prettify,
} from '@/types/utils/common';

type Props<T extends FieldValues> = Prettify<
	MakeRequired<Omit<ControllerProps<T>, 'render'>, 'control'> &
		MakeOptional<
			Omit<SelectProps, 'isInvalid' | 'items' | 'disabled'>,
			'children'
		> & {
			options: UI.SelectOption[];
			controllerKey?: Key | null;
			ref?: RefObject<HTMLSelectElement> | RefCallback<HTMLSelectElement>;
		}
>;
function ControlledSelect<T extends FieldValues>({
	control,
	label,
	labelPlacement,
	options,
	name,
	className,
	children,
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

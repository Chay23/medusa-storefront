import { ReactNode } from 'react';

import { Chip, ChipProps } from '@heroui/chip';
import { cn } from '@heroui/theme';

type Colors = {
	[K in NonNullable<ChipProps['color']>]?: string;
};

const colorValues: Colors = {
	success: 'bg-success-500',
	danger: 'bg-danger-500',
	default: 'bg-default-500',
	warning: 'bg-warning-500',
	primary: 'bg-primary',
	secondary: 'bg-secondary',
};

type Props = ChipProps & {
	wrapped?: boolean;
	children: ReactNode;
};

export default function StatusBadge({
	wrapped = false,
	children,
	color = 'default',
	...props
}: Props) {
	return (
		<Chip
			variant='dot'
			classNames={{
				dot: cn(colorValues[color], props.classNames?.dot),
				base: cn(`${!wrapped ? 'border-none' : ''}`, props.classNames?.base),
			}}
			{...props}
		>
			{children}
		</Chip>
	);
}

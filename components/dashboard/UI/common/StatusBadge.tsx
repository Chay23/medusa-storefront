import { ReactNode } from 'react';

import { Chip, ChipVariantProps } from '@heroui/react';

type Colors = {
	[K in NonNullable<ChipVariantProps['color']>]?: string;
};

const colorValues: Colors = {
	success: 'bg-success-500',
	danger: 'bg-danger-500',
	default: 'bg-default-500',
	warning: 'bg-warning-500',
	primary: 'bg-primary',
	secondary: 'bg-secondary',
};

type Props = ChipVariantProps & {
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
				dot: colorValues[color],
				base: `${!wrapped ? 'border-none' : ''}`,
			}}
			{...props}
		>
			{children}
		</Chip>
	);
}

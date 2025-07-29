import { ReactNode } from 'react';

import { Chip, ChipProps } from '@heroui/chip';
import { cn } from '@heroui/theme';

import { COLOR_MAP } from '@/lib/dashboard/constants/ui';

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
			// key is used to avoid cases where the previous dot color was used after path revalidation
			key={COLOR_MAP[color]}
			variant='dot'
			classNames={{
				dot: cn(COLOR_MAP[color], props.classNames?.dot),
				base: cn(`${!wrapped ? 'border-none' : ''}`, props.classNames?.base),
			}}
			{...props}
		>
			{children}
		</Chip>
	);
}

import { ReactNode } from 'react';

import { Divider } from '@heroui/divider';
import { cn } from '@heroui/theme';

type Props = {
	title: ReactNode;
	value: ReactNode;
	className?: string;
	includeDivider?: boolean;
};

export default function SectionRow({
	title,
	value,
	className = '',
	includeDivider = false,
}: Props) {
	return (
		<>
			<div className={cn('flex my-2', className)}>
				<div className='flex-1'>{title}</div>
				<div className='text-foreground-500 flex-1'>{value}</div>
			</div>
			{includeDivider && <Divider />}
		</>
	);
}

import { cn } from '@heroui/react';
import type { ReactNode } from 'react';

type Props = {
	title: string;
	endContent?: ReactNode;
	description?: ReactNode;
	className?: string;
};

export default function SectionHeader({
	title,
	endContent,
	description = '',
	className = '',
}: Props) {
	return (
		<div className={cn('w-full flex justify-between', className)}>
			<div>
				<h3 className='mb-1'>{title}</h3>
				{description && <p className='text-text-secondary'>{description}</p>}
			</div>
			{Boolean(endContent) && endContent}
		</div>
	);
}

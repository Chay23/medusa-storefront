import type { ReactNode } from 'react';

import { cn } from '@heroui/theme';

type Props = {
	title: ReactNode;
	titleClassName?: string;
	middleContent?: ReactNode;
	endContent?: ReactNode;
	description?: ReactNode;
	className?: string;
};

export default function SectionHeader({
	title,
	titleClassName = '',
	middleContent,
	endContent,
	description = '',
	className = '',
}: Props) {
	return (
		<div className={cn('w-full flex justify-between', className)}>
			<div>
				<div className='flex items-center'>
					<h3 className={cn('mb-1 mr-3', titleClassName)}>{title}</h3>
					{Boolean(middleContent) && middleContent}
				</div>
				{description && <p className='text-text-secondary'>{description}</p>}
			</div>
			{Boolean(endContent) && endContent}
		</div>
	);
}

import type { ReactNode } from 'react';

type Props = {
	title: string;
	endContent?: ReactNode;
	description?: ReactNode;
};

export default function SectionHeader({
	title,
	endContent,
	description = '',
}: Props) {
	return (
		<div>
			<div className='w-full flex justify-between mb-7'>
				<div>
					<h3>{title}</h3>
					{description && (
						<p className='text-text-secondary mt-2'>{description}</p>
					)}
				</div>
				{Boolean(endContent) && endContent}
			</div>
		</div>
	);
}

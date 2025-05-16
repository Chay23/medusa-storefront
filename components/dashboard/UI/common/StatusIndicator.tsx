import { ReactNode } from 'react';

type Props = {
	value: boolean;
	children: ReactNode;
};

export default function StatusIndicator({ value, children }: Props) {
	return (
		<div className='flex gap-2 items-center'>
			<div
				className={`w-[8px] h-[8px] rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}
			></div>
			{children}
		</div>
	);
}

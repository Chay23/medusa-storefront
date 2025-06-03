type Props = {
	height?: string;
};

export default function LoadingInput({ height = '40' }: Props) {
	return (
		<div className='w-full flex flex-col gap-1'>
			<div className='w-full h-[20px] bg-loading animate-pulse rounded'></div>
			<div
				className={`w-full h-[${height}px] bg-loading animate-pulse rounded`}
			></div>
		</div>
	);
}

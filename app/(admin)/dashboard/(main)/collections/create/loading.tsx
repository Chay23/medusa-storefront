export default function Loading() {
	return (
		<div className='content-container flex justify-center'>
			<div className='w-full max-w-[720px]'>
				<div className='h-[70px] bg-loading animate-pulse rounded'></div>
				<div className='flex mt-8 gap-8'>
					<div className='flex-1 h-[68px] bg-loading animate-pulse rounded'></div>
					<div className='flex-1 h-[68px] bg-loading animate-pulse rounded'></div>
				</div>
			</div>
		</div>
	);
}

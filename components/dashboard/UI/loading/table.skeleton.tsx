export default function TableSkeleton() {
	return (
		<>			
			<div className='w-full h-[530px] mb-5 bg-loading animate-pulse rounded'></div>
			<div className='flex justify-between'>
				<div className='w-[200px] h-[36px] bg-loading animate-pulse rounded'></div>
				<div className='w-[200px] h-[36px] bg-loading animate-pulse rounded'></div>
			</div>
		</>
	);
}

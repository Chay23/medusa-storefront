export default function Loading() {
	return (
		<>
			<div className='h-[20px] bg-loading animate-pulse rounded my-3'></div>
			<div className='flex flex-col gap-9'>
				<div className='content-container h-[136px]'>
					<div className='h-[40px] mb-7 bg-loading animate-pulse rounded'></div>
					<div className='h-[30px] bg-loading animate-pulse rounded'></div>
				</div>
				<div className='content-container'>
					<div className='w-full h-[50px] mb-7 bg-loading animate-pulse rounded'>
						<div></div>
					</div>
					<div className='w-full h-[56px] mb-4 bg-loading animate-pulse rounded'></div>
					<div className='w-full h-[530px] mb-3 bg-loading animate-pulse rounded'></div>
					<div className='w-[100px] h-[30px] bg-loading animate-pulse rounded'></div>
				</div>
			</div>
		</>
	);
}

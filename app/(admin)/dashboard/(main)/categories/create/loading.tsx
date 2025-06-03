import LoadingInput from '@/components/dashboard/UI/loading/LoadingInput';

export default function Loading() {
	return (
		<>
			<div className='w-[200px] h-[20px] my-3 bg-loading animate-pulse rounded'></div>
			<div className='content-container'>
				<div className='w-[220px] h-[40px] mb-7 bg-loading animate-pulse rounded'></div>
				<div className='w-full flex justify-center'>
					<div className='max-w-[720px] grow'>
						<div className='w-[400px] h-[68px] mb-4 bg-loading animate-pulse rounded'></div>
						<div className='flex flex-col gap-8'>
							<div className='flex flex-row gap-8'>
								<LoadingInput />
								<LoadingInput />
							</div>
							<LoadingInput height='100' />
							<div className='flex flex-row gap-8'>
								<LoadingInput />
								<LoadingInput />
							</div>
							<div className='flex justify-end'>
								<div className='w-[90px] h-[40px] bg-loading animate-pulse rounded'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

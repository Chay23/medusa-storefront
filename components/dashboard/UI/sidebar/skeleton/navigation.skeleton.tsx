export function NavigationSkeleton() {
	return (
		<div className='flex flex-col gap-1'>
			{[...Array(6)].map(() => (
				<div className='w-full h-[40px] animate-pulse bg-loading rounded-lg'></div>
			))}
		</div>
	);
}

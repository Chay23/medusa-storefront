export default function LoadingSpinner() {
	// spinner matches HeroUI spinner
	return (
		<div
			aria-label='Loading'
			className='relative inline-flex flex-col gap-2 items-center justify-center'
		>
			<div className='relative flex w-5 h-5'>
				<i className='absolute w-full h-full rounded-full animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent border-2 border-b-current'></i>
				<i className='absolute w-full h-full rounded-full opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent border-2 border-b-current'></i>
			</div>
		</div>
	);
}

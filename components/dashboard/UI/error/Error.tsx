import type { RetrieveError } from '@/types/common/fetch';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type Props = {
	error: RetrieveError | null;
};

export default function Error({ error }: Props) {
	return (
		<div className='w-full h-full flex items-center justify-center'>
			<div className='content-container w-fit flex flex-col gap-4 items-center p-14'>
				<div className='flex flex-col justify-center items-center gap-3'>
					<ErrorOutlineIcon fontSize='large' />
					<h4>An error ocurred</h4>
					<p>
						{error?.message || 'Something went wrong. Please try reloading page.'}
					</p>
				</div>
			</div>
		</div>
	);
}

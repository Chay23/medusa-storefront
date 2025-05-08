import type { RetrieveError } from '@/types/common/fetch';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type Props = {
	error: RetrieveError;
};

export default function Error({ error }: Props) {
	return (
		<div className='w-full h-full flex items-center justify-center'>
			<div className='content-container w-fit flex flex-col gap-4 items-center p-14'>
				<div className='flex items-center gap-3'>
					<ErrorOutlineIcon fontSize='large' />
					<h2>{error.message}</h2>
				</div>
				{error.description && <div>{error.description}</div>}
			</div>
		</div>
	);
}

'use client';

import { useEffect } from 'react';
import { Button } from '@heroui/react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className='w-full h-full flex items-center justify-center'>
			<div className='content-container w-fit flex flex-col gap-4 items-center p-14'>
				<div className='flex items-center gap-3'>
					<ErrorOutlineIcon fontSize='large' />
					<h2>An Error Occured</h2>
				</div>
				<Button color='default' onPress={() => reset()}>
					Try again
				</Button>
			</div>
		</div>
	);
}

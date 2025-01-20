'use client';

import { useState } from 'react';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { signIn } from '@/lib/dashboard/data/user';

import VisibilityOutIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function SignIn() {
	const [isVisible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible((prevState) => !prevState);
	};

	return (
		<div className='flex flex-col items-center w-[300px] gap-6'>
			<h2 className='text-2xl'>Welcome to Dashboard</h2>
			<Form className='items-center gap-7 w-full' action={signIn}>
				<Input
					name='email'
					type='email'
					labelPlacement='outside'
					label='Email'
					placeholder='Enter your email'
				/>
				<Input
					name='password'
					type={isVisible ? 'text' : 'password'}
					labelPlacement='outside'
					label='Password'
					placeholder='Enter your password'
					endContent={
						<button
							aria-label='toggle password visibility'
							type='button'
							onClick={toggleVisibility}
						>
							{isVisible ? <VisibilityOffIcon /> : <VisibilityOutIcon />}
						</button>
					}
				/>
				<Button color="primary" type='submit'>Sign In</Button>
			</Form>
			<div>
				Forgot Password - <Link href=''>Reset</Link>
			</div>
		</div>
	);
}

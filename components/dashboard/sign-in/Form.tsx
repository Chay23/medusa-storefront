'use client';

import { useActionState, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { signIn } from '@/lib/dashboard/data/user';
import { showActionToast } from '@/lib/dashboard/utils';

import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import VisibilityOutIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';

type Inputs = {
	email: string;
	password: string;
};

type Props = {
	from: string | undefined;
};

export default function SignInForm({ from }: Props) {
	const boundSignIn = signIn.bind(null, from);
	const [actionState, formAction, isPending] = useActionState(boundSignIn, {
		success: false,
		errors: {},
		toast: null,
	});
	const [isVisible, setVisible] = useState(false);
	const { control } = useForm<Inputs>({
		defaultValues: { email: '', password: '' },
	});

	useEffect(() => {
		if (actionState.toast) {
			showActionToast('sign-in', actionState);
		}
	}, [actionState]);

	const toggleVisibility = () => {
		setVisible((prevState) => !prevState);
	};

	// Controller is used to preserve values after submitting the form
	return (
		<Form className='items-center gap-7 w-full' action={formAction}>
			<Controller
				name='email'
				control={control}
				rules={{ required: 'You need to enter an email address' }}
				render={({
					fieldState: { error, invalid },
					field: { name, value, onChange },
				}) => (
					<Input
						name={name}
						type='email'
						labelPlacement='outside'
						label='Email'
						placeholder='Enter your email'
						value={value}
						onChange={onChange}
						isInvalid={Boolean(actionState.errors?.email)}
						errorMessage={actionState.errors?.email ?? ''}
					/>
				)}
			/>
			<Controller
				name='password'
				control={control}
				rules={{ required: 'You need to enter a password' }}
				render={({
					fieldState: { error, invalid },
					field: { name, value, onChange },
				}) => (
					<Input
						name={name}
						type={'password'}
						labelPlacement='outside'
						label='Password'
						placeholder='Enter your password'
						value={value}
						onChange={onChange}
						isInvalid={Boolean(actionState.errors?.password)}
						errorMessage={actionState.errors?.password ?? ''}
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
				)}
			/>

			<Button color='primary' isLoading={isPending} type='submit'>
				Sign In
			</Button>
		</Form>
	);
}

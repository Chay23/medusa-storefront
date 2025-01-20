'use server';

import { redirect } from 'next/navigation';
import { setAuthToken } from './cookies';

export const signIn = async (formData: FormData) => {
	const rawFormData = {
		email: formData.get('email'),
		password: formData.get('password'),
	};

	const res = await fetch(`${process.env.API_BASE_URL}/auth/user/emailpass`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(rawFormData),
	});

	if (!res.ok) {
		return;
	}

	const { token } = await res.json();
	await setAuthToken(token);

	redirect('/dashboard');
};

'use server';

import { redirect } from 'next/navigation';
import { setAuthToken } from './cookies';
import { getAdminURL } from '@/utils/env';

export const signIn = async (from: string | null, formData: FormData) => {
	const rawFormData = {
		email: formData.get('email'),
		password: formData.get('password'),
	};
	const adminURL = getAdminURL();

	const res = await fetch(`${adminURL}/auth/user/emailpass`, {
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

	if (from !== null) {
		return redirect(from);
	}
	redirect('/dashboard');
};

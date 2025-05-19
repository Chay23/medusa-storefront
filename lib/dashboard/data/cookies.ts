'use server';

import { cookies } from 'next/headers';

export const setAuthToken = async (token: string) => {
	const cookiesStore = await cookies();

	cookiesStore.set('_admin_jwt', token, {
		maxAge: 60 * 60 * 24,
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
	});
};

export const removeAuthToken = async () => {
	const cookiesStore = await cookies();
	cookiesStore.delete('_admin_jwt');
};

export const getAuthHeader = async () => {
	const cookiesStore = await cookies();
	const token = cookiesStore.get('_admin_jwt')?.value;
	return { Authorization: `Bearer ${token}` };
};

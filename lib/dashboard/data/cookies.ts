'use server';

import { cookies } from 'next/headers';

export const setAuthToken = async (token: string) => {
	const cookiesStore = await cookies();

	cookiesStore.set('_admin_jwt', token, {
		maxAge: 60 * 60 * 24 * 7,
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
	});
};

'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from '../constants/cookies';

export const setAuthToken = async (token: string) => {
	const cookiesStore = await cookies();

	cookiesStore.set(AUTH_COOKIE_NAME, token, {
		maxAge: AUTH_COOKIE_MAX_AGE,
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
	});
};

export const getAuthHeader = async () => {
	const cookiesStore = await cookies();
	const token = cookiesStore.get(AUTH_COOKIE_NAME)?.value;
	return { Authorization: `Bearer ${token}` };
};

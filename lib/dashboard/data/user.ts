'use server';

import type { ActionStateWithValidation } from '@/types/api/actions/common';
import type { Api } from '@/types/api';

import { redirect } from 'next/navigation';
import { setAuthToken } from './cookies';
import { getAdminURL } from '@/utils/env';
import { z } from 'zod';
import { paths } from '@/config/paths';
import ResponseError from '@/lib/errors/ResponseError';

export const signIn = async (
	from: string | undefined,
	_: any,
	formData: FormData
): Promise<ActionStateWithValidation> => {
	const rawFormData = {
		email: formData.get('email'),
		password: formData.get('password'),
	};

	const formSchema = z.object({
		email: z.string().email('Email address is not valid'),
		password: z.string().min(1, 'You need to enter a password'),
	});

	const validation = formSchema.safeParse(rawFormData);

	if (!validation.success) {
		const errors: Record<string, string> = {};
		validation.error.errors.forEach((err) => {
			errors[err.path[0]] = err.message;
		});

		return { success: false, errors, toast: null };
	}
	const adminURL = getAdminURL();

	try {
		const res = await fetch(`${adminURL}/auth/user/emailpass`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(rawFormData),
		});

		if (!res.ok) {
			const json = (await res.json()) as Api.ErrorResponse;
			throw new ResponseError(json.message);
		}
		const { token } = await res.json();
		await setAuthToken(token);

		if (from) {
			return redirect(from);
		}
		redirect(paths.dashboard.root.getHref());
	} catch (e) {
		if (e instanceof ResponseError) {
			return {
				success: false,
				toast: { message: e.message },
				errors: {},
			};
		}
		return {
			success: false,
			toast: { message: 'An unknown error occured' },
			errors: {},
		};
	}
};

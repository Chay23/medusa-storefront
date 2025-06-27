'use server';

import type { ActionStateWithValidation } from '@/types/api/actions/common';
import type { Api } from '@/types/api';

import { redirect } from 'next/navigation';
import { deleteAuthToken, setAuthToken } from './cookies';
import { getAdminURL } from '@/utils/env';
import { z } from 'zod';
import { paths } from '@/config/paths';
import ResponseError from '@/lib/errors/ResponseError';
import {
	VALIDATION_EMPTY_EMAIL,
	VALIDATION_EMPTY_PASSWORD,
	VALIDATION_INVALID_EMAIL,
} from '../constants/validation';
import {
	AUTH_TOKEN_LOG_ERROR_MESSAGE,
	GENERIC_AUTH_ERROR_MESSAGE,
} from '../constants/errors';

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
		email: z
			.string()
			.min(1, VALIDATION_EMPTY_EMAIL)
			.email(VALIDATION_INVALID_EMAIL),
		password: z.string().min(1, VALIDATION_EMPTY_PASSWORD),
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

		if (!token) {
			throw new Error(AUTH_TOKEN_LOG_ERROR_MESSAGE);
		}

		await setAuthToken(token);
	} catch (e) {
		console.error(e);
		if (e instanceof ResponseError) {
			return {
				success: false,
				toast: { message: e.message },
				errors: {},
			};
		}
		return {
			success: false,
			toast: { message: GENERIC_AUTH_ERROR_MESSAGE },
			errors: {},
		};
	}
	redirect(from || paths.dashboard.root.getHref());
};

export const signOut = async () => {
	await deleteAuthToken();
	redirect(paths.dashboard.signIn.getHref());
};

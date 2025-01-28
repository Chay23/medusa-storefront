'use server';

import type { Api } from '@/types/api';
import type { ActionState } from '@/types/errors/actions';

import { getAuthHeader } from './cookies';
import { getAdminURL } from '@/utils/env';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const getCollections = async (
	pageParam = 1,
	queryParams: Api.FindParams & Api.SearchParams
): Promise<Api.AdminCollectionListResponse> => {
	const limit = queryParams?.limit || 12;
	const _pageParam = Math.max(pageParam, 1);
	const offset = (_pageParam - 1) * limit;
	const adminURL = getAdminURL();

	const headers = {
		...(await getAuthHeader()),
	};

	const _queryParams = new URLSearchParams({
		...queryParams,
		limit: limit.toString(),
		offset: offset.toString(),
	}).toString();

	const res = await fetch(`${adminURL}/admin/collections?${_queryParams}`, {
		headers,
	});
	const collections = await res.json();

	return collections;
};

export const createCollection = async (
	prevState: ActionState,
	formData: FormData
): Promise<ActionState> => {
	const adminURL = getAdminURL();
	const rawFormData = {
		title: formData.get('title'),
		handle: formData.get('handle'),
	};

	const formSchema = z.object({
		title: z.string().min(1, 'Title is required'),
	});

	const validation = formSchema.safeParse(rawFormData);

	if (!validation.success) {
		const errors: Record<string, string> = {};
		validation.error.errors.forEach((err) => {
			errors[err.path[0]] = err.message;
		});

		return { success: false, errors, toast: null };
	}

	const headers = {
		'Content-Type': 'application/json',
		...(await getAuthHeader()),
	};

	const res = await fetch(`${adminURL}/admin/collections`, {
		method: 'POST',
		headers,
		body: JSON.stringify(rawFormData),
	});

	if (res.ok) {
		return {
			success: true,
			errors: {},
			toast: { message: 'Collection successfully created' },
		};
		// redirect('/dashboard/collections');
	}

	const json = await res.json();

	return {
		success: false,
		errors: {},
		toast: { message: json.message },
	};
};

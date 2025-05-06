'use server';

import type { Api } from '@/types/api';
import type { ActionState } from '@/types/api/errors/actions';
import type { RetrieveResponse } from '@/types/common/fetch';

import { getAuthHeader } from './cookies';
import { getAdminURL } from '@/utils/env';
import { z } from 'zod';
import { errorObject_1 } from '../common/error/constants';
import { getRetrieveError } from '../common/error/utils';
import { revalidatePath } from 'next/cache';

export const getCollections = async (
	pageParam = 1,
	queryParams: Api.FindParams & Api.SearchParams
): Promise<RetrieveResponse<Api.AdminCollectionListResponse>> => {
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
		order: queryParams.order ?? '-created_at',
	}).toString();

	const url = `${adminURL}/admin/collections?${_queryParams}`;

	try {
		const res = await fetch(url, {
			headers,
		});

		if (!res.ok) {
			throw new Error(getRetrieveError(url));
		}

		const collections = await res.json();

		return {
			success: true,
			error: null,
			data: collections as Api.AdminCollectionListResponse,
		};
	} catch (e) {
		console.error(e);

		return {
			success: false,
			error: errorObject_1,
			data: null,
		};
	}
};

export const getCollection = async (
	id: string
): Promise<RetrieveResponse<Api.AdminCollectionResponse>> => {
	const adminURL = getAdminURL();
	const url = `${adminURL}/admin/collections/${id}`;

	const headers = {
		...(await getAuthHeader()),
	};

	try {
		const res = await fetch(url, {
			headers,
		});

		if (!res.ok) {
			throw new Error(getRetrieveError(url));
		}

		const collection = await res.json();

		return { success: true, error: null, data: collection };
	} catch (e) {
		console.error(e);
		return { success: false, error: errorObject_1, data: null };
	}
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
	}

	const json = await res.json();

	return {
		success: false,
		errors: {},
		toast: { message: json.message },
	};
};

export const updateCollection = async (
	{ id }: { id: string },
	_: any,
	formData: FormData
): Promise<ActionState> => {
	const adminURL = getAdminURL();
	const rawFormData = {
		title: formData.get('title'),
		handle: formData.get('handle'),
	};

	const headers = {
		'Content-Type': 'application/json',
		...(await getAuthHeader()),
	};

	const res = await fetch(`${adminURL}/admin/collections/${id}`, {
		method: 'POST',
		headers,
		body: JSON.stringify(rawFormData),
	});

	if (res.ok) {
		revalidatePath(`/dashboard/collections/${id}`)
		return {
			success: true,
			errors: {},
			toast: { message: 'Collection successfully edited' },
		};
	}

	const json = await res.json();

	return {
		success: false,
		errors: {},
		toast: { message: json.message },
	};
};

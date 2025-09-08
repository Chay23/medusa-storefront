'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

import { z } from 'zod';

import { paths } from '@/config/paths';
import { API_URL, LIMIT_OPTION } from '@/lib/dashboard/constants';
import type { Api } from '@/types/api';
import type {
	ActionState,
	ActionStateWithValidation,
} from '@/types/api/actions/common';
import type { RetrieveResponse } from '@/types/common/fetch';

import { getAuthHeader } from './cookies';
import { cacheTags } from '../constants/cache-tags';
import { getPaginatedList, handleFetch } from '../services/api';

export const getCollections = async (
	page = 1,
	queryParams: Api.FindParams & Api.SearchParams
): Promise<RetrieveResponse<Api.AdminCollectionListResponse>> => {
	const limit = queryParams?.limit || LIMIT_OPTION;
	return await getPaginatedList({
		page,
		limit,
		path: '/admin/collections',
		queryParams,
		next: {
			tags: [cacheTags.collectionList],
		},
	});
};

export const getCollection = async (
	id: string
): Promise<RetrieveResponse<Api.AdminCollectionResponse>> => {
	const url = `${API_URL}/admin/collections/${id}`;

	const headers = {
		...(await getAuthHeader()),
	};

	return handleFetch(url, { headers });
};

export const createCollection = async (
	prevState: ActionState,
	formData: FormData
): Promise<ActionStateWithValidation> => {
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

	const res = await fetch(`${API_URL}/admin/collections`, {
		method: 'POST',
		headers,
		body: JSON.stringify(rawFormData),
	});

	if (!res.ok) {
		const json = await res.json();

		return {
			success: false,
			errors: {},
			toast: { message: json.message },
		};
	}

	revalidateTag(cacheTags.collectionList);

	return {
		success: true,
		errors: {},
		toast: { message: 'Collection successfully created' },
	};
};

export const updateCollection = async (
	id: string,
	_: unknown,
	formData: FormData
): Promise<ActionState> => {
	const rawFormData = {
		title: formData.get('title'),
		handle: formData.get('handle'),
	};

	const headers = {
		'Content-Type': 'application/json',
		...(await getAuthHeader()),
	};

	try {
		const res = await fetch(`${API_URL}/admin/collections/${id}`, {
			method: 'POST',
			headers,
			body: JSON.stringify(rawFormData),
		});

		if (!res.ok) {
			throw new Error();
		}

		revalidatePath(paths.dashboard.collection.getHref(id));
		revalidateTag(cacheTags.collectionList);

		return {
			success: true,
			toast: { message: 'Collection successfully edited' },
		};
	} catch {
		return {
			success: false,
			toast: { message: 'Failed to edit collection' },
		};
	}
};

export const deleteCollection = async (id: string): Promise<ActionState> => {
	const headers = {
		'Content-Type': 'application/json',
		...(await getAuthHeader()),
	};

	try {
		const res = await fetch(`${API_URL}/admin/collections/${id}`, {
			method: 'DELETE',
			headers,
		});

		if (!res.ok) {
			throw new Error();
		}

		revalidateTag(cacheTags.collectionList);

		return {
			success: true,
			toast: { message: 'Collection successfully deleted' },
		};
	} catch {
		return {
			success: false,
			toast: { message: 'Failed to delete collection' },
		};
	}
};

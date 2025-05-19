'use server';

import type { Api } from '@/types/api';
import type {
	ActionState,
	ActionStateWithValidation,
} from '@/types/api/actions/common';
import type { RetrieveResponse } from '@/types/common/fetch';

import { getAuthHeader } from './cookies';
import { getAdminURL } from '@/utils/env';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { paths } from '@/config/paths';
import { getPaginatedList, handleFetch } from '../services/api';
import { LIMIT_OPTION } from '../constants';

export const getCollections = async (
	page = 1,
	queryParams: Api.FindParams & Api.SearchParams
): Promise<RetrieveResponse<Api.AdminCollectionListResponse>> => {
	const limit = queryParams?.limit || LIMIT_OPTION;
	return await getPaginatedList(page, limit, '/admin/collections', queryParams);
};

export const getCollection = async (
	id: string
): Promise<RetrieveResponse<Api.AdminCollectionResponse>> => {
	const adminURL = getAdminURL();
	const url = `${adminURL}/admin/collections/${id}`;

	const headers = {
		...(await getAuthHeader()),
	};

	return handleFetch(url, { headers });
};

export const createCollection = async (
	prevState: ActionState,
	formData: FormData
): Promise<ActionStateWithValidation> => {
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

	try {
		const res = await fetch(`${adminURL}/admin/collections/${id}`, {
			method: 'POST',
			headers,
			body: JSON.stringify(rawFormData),
		});

		if (!res.ok) {
			throw new Error();
		}

		revalidatePath(paths.dashboard.collection.getHref(id));
		return {
			success: true,
			toast: { message: 'Collection successfully edited' },
		};
	} catch (_) {
		return {
			success: false,
			toast: { message: 'Failed to edit collection' },
		};
	}
};

export const deleteCollection = async ({
	id,
}: {
	id: string;
}): Promise<ActionState> => {
	const adminURL = getAdminURL();

	const headers = {
		'Content-Type': 'application/json',
		...(await getAuthHeader()),
	};

	try {
		const res = await fetch(`${adminURL}/admin/collections/${id}`, {
			method: 'DELETE',
			headers,
		});

		if (!res.ok) {
			throw new Error();
		}

		return {
			success: true,
			toast: { message: 'Collection successfully deleted' },
		};
	} catch (_) {
		return {
			success: false,
			toast: { message: 'Failed to delete collection' },
		};
	}
};

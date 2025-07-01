'use server';

import type { Api } from '@/types/api';
import type { ActionState } from '@/types/api/actions/common';
import type { RetrieveResponse } from '@/types/common/fetch';

import {
	getFullList,
	getPaginatedList,
	handleActionFetch,
	handleFetch,
} from '../services/api';
import { getAuthHeader } from './cookies';
import { API_ADMIN_URL, LIMIT_OPTION } from '@/lib/dashboard/constants';

export const getCategories = async (
	page = 1,
	queryParams?: Api.FindParams & Api.SearchParams
) => {
	const limit = queryParams?.limit || LIMIT_OPTION;
	return await getPaginatedList<Api.AdminProductCategoryListResponse>(
		page,
		limit,
		'/admin/product-categories',
		queryParams
	);
};

export const getAllCategories = async (
	queryParams?: Api.AdminProductCategoryListParams
) => {
	return await getFullList<Api.AdminProductCategoryListResponse>(
		'/admin/product-categories',
		queryParams
	);
};

export const getCategory = async (
	id: string
): Promise<RetrieveResponse<Api.AdminProductCategoryResponse>> => {
	const url = `${API_ADMIN_URL}/admin/product-categories/${id}`;

	const headers = {
		...(await getAuthHeader()),
	};

	return handleFetch(url, { headers });
};

export const createCategory = async (
	_: ActionState,
	formData: FormData
): Promise<ActionState> => {
	const adminURL = API_ADMIN_URL;
	const rawFormData = {
		name: formData.get('name'),
		...(formData.get('handle') && { handle: formData.get('handle') }),
		description: formData.get('description'),
		is_active: formData.get('is_active') === 'active' ? true : false,
		is_internal: formData.get('is_internal') === 'internal' ? true : false,
		rank: parseInt(formData.get('rank') as string),
		parent_category_id: null,
	};

	const headers = {
		'Content-Type': 'application/json',
		...(await getAuthHeader()),
	};

	return await handleActionFetch(
		`${adminURL}/admin/product-categories`,
		{ method: 'POST', headers, body: JSON.stringify(rawFormData) },
		'Category successfully created'
	);
};

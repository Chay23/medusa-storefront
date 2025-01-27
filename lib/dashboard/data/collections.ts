'use server';

import { Api } from '@/types/api';
import { getAuthHeader } from './cookies';
import { getAdminURL } from '@/utils/env';

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

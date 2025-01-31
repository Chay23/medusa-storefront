'use server';

import type { Api } from '@/types/api';

import { getAuthHeader } from './cookies';
import { getAdminURL } from '@/utils/env';

export const getProducts = async (
	pageParam = 1,
	queryParams: Api.FindParams & Api.SearchParams & Api.ProductsParams
): Promise<Api.ProductsResponse> => {
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
	});

	const res = await fetch(
		`${adminURL}/admin/products?${_queryParams.toString()}`,
		{ headers }
	);
	const products = await res.json();

	return products;
};

'use server';

import type { Api } from '@/types/api';

import { getAuthHeader } from './cookies';
import { getAdminURL } from '@/utils/env';
import { RetrieveResponse } from '@/types/common/fetch';
import { errorObject_1 } from '../common/error/constants';
import { getRetrieveError } from '../common/error/utils';

export const getProducts = async (
	pageParam = 1,
	queryParams: Api.FindParams & Api.SearchParams & Api.ProductsParams
): Promise<RetrieveResponse<Api.ProductsResponse>> => {
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

	const url = `${adminURL}/admin/products?${_queryParams.toString()}`;

	try {
		const res = await fetch(url, { headers });
		if (!res.ok) {
			throw new Error(getRetrieveError(url));
		}
		const products = await res.json();

		return {
			success: true,
			error: null,
			data: products as Api.ProductsResponse,
		};
	} catch (e) {
		console.error(e);
		return { success: false, data: null, error: errorObject_1 };
	}
};

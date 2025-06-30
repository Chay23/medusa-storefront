'use server';

import type { Api } from '@/types/api';
import type { RetrieveResponse } from '@/types/common/fetch';

import { getPaginatedList } from '../services/api';
import { LIMIT_OPTION } from '../constants/api';

export const getProducts = async (
	page = 1,
	queryParams: Api.FindParams & Api.SearchParams & Api.ProductsParams
): Promise<RetrieveResponse<Api.ProductsResponse>> => {
	const limit = queryParams?.limit || LIMIT_OPTION;
	return await getPaginatedList(page, limit, '/admin/products', queryParams);
};

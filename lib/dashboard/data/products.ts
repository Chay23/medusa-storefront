'use server';

import type { Api } from '@/types/api';
import type { HttpTypes } from '@medusajs/types';
import type { RetrieveResponse } from '@/types/common/fetch';

import { getPaginatedList } from '../services/api';
import { LIMIT_OPTION } from '../constants/api';
import { transformQueryParams } from '@/lib/common/utils/params';

type AdminProductListParamsKeys = keyof HttpTypes.AdminProductListParams;

export const getProducts = async (
	page = 1,
	queryParams: HttpTypes.AdminProductListParams
): Promise<RetrieveResponse<Api.ProductsResponse>> => {
	const limit = queryParams.limit || LIMIT_OPTION;

	const params = transformQueryParams(queryParams, {
		arr: ['status', 'type_id'] as AdminProductListParamsKeys[],
		obj: ['created_at', 'updated_at'] as AdminProductListParamsKeys[],
	});

	return await getPaginatedList(page, limit, '/admin/products', params);
};

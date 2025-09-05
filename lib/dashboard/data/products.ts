'use server';

import type { HttpTypes } from '@medusajs/types';

import { transformQueryParams } from '@/lib/common/utils/params';
import type { Api } from '@/types/api';
import type { RetrieveResponse } from '@/types/common/fetch';

import { LIMIT_OPTION } from '../constants/api';
import { getPaginatedList } from '../services/api';

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

	return await getPaginatedList({
		page,
		limit,
		path: '/admin/products',
		queryParams: params,
	});
};

import type { Api } from '@/types/api';
import type { RetrieveResponse } from '@/types/common/fetch';

import { getPaginatedList } from '../services/api';
import { LIMIT_OPTION } from '../constants';
import { AdminProductCategoryListResponse } from '@/types/api/product-categories';

export const getCategories = async (
	page = 1,
	queryParams?: Api.FindParams & Api.SearchParams
) => {
	const limit = queryParams?.limit || LIMIT_OPTION;
	return await getPaginatedList<AdminProductCategoryListResponse>(
		page,
		limit,
		'/admin/product-categories',
		queryParams
	);
};

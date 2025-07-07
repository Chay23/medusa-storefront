import type { Api } from '@/types/api';
import type { RetrieveResponse } from '@/types/common/fetch';

import { getFullList } from '../services/api';

export const getAllProductTypes = async (
	queryParams?: Api.AdminProductTypeListParams
): Promise<RetrieveResponse<Api.AdminProductTypeListResponse>> => {
	return await getFullList('/admin/product-types', queryParams);
};

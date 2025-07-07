import { RetrieveResponse } from '@/types/common/fetch';
import {
	HttpTypes
} from '@medusajs/types';
import { getFullList } from '../services/api';

export const getAllProductTags = async (
	queryParams?: HttpTypes.AdminProductTagListParams
): Promise<RetrieveResponse<HttpTypes.AdminProductTagListResponse>> => {
	return await getFullList('/admin/product-tags', queryParams);
};

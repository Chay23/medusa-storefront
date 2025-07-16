import { PaginatedResponse } from '../../common';
import { AdminProductType } from './entities';

export type AdminProductTypeListResponse = PaginatedResponse<{
	product_types: AdminProductType[];
}>;

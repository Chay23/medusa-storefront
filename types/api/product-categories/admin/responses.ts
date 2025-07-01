import { PaginatedResponse } from '../../common';
import { AdminProductCategory } from './entities';

export type AdminProductCategoryListResponse = PaginatedResponse<{
	product_categories: AdminProductCategory[];
}>;

export type AdminProductCategoryResponse = {
	product_category: AdminProductCategory;
};

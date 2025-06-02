import { BaseProductCategoryListParams } from '../common';

export type AdminProductCategoryListParams = BaseProductCategoryListParams & {
	is_internal?: boolean;
	is_active?: boolean;
};

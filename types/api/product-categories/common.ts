import { FindParams, SearchParams } from '../common';
import { BaseProduct } from '../products/common';

export type BaseProductCategory = {
	id: string;
	name: string;
	description: string;
	handle: string;
	is_active: boolean;
	is_internal: boolean;
	rank: number | null;
	parent_category_id: string | null;
	parent_category: BaseProductCategory | null;
	category_children: BaseProductCategory[];
	products?: BaseProduct[];
	metadata?: Record<string, unknown> | null;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};

export type BaseProductCategoryListParams = FindParams &
	SearchParams & {
		id?: string | string[];
		name?: string | string[];
		description?: string | string[];
		parent_category_id?: string | string[] | null;
		handle?: string | string[];
		is_active?: boolean;
		is_internal?: boolean;
		include_descendants_tree?: boolean;
		include_ancestors_tree?: boolean;
		created_at?: string;
		updated_at?: string;
		deleted_at?: string;
	};

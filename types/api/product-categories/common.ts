import { BaseProduct } from '../products';

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

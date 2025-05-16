import { AdminProduct } from '../../products/admin/entities';
import { BaseProductCategory } from '../common';

export type AdminProductCategory = Omit<
	BaseProductCategory,
	'products' | 'category_children' | 'parent_category'
> & {
	category_children: AdminProductCategory[];
	parent_category: AdminProductCategory | null;
	products?: AdminProduct[];
};

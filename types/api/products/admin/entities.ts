import { AdminCollection } from '../../collections';
import { AdminProductCategory } from '../../product-categories/admin/entities';
import { BaseProduct } from '../common';

export type AdminProduct = Omit<BaseProduct, 'categories' | 'variants'> & {
	collection?: AdminCollection | null;
	categories?: AdminProductCategory[] | null;
};

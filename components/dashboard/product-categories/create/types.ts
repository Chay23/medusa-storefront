import { AdminProductCategory } from '@/types/api/product-categories';

export type Inputs = {
	name: string;
	handle: string;
	description: string;
	is_active: string;
	is_internal: string;
};

type NewCategory = {
	id: string;
	name: string;
};

export type WithNewCategory = AdminProductCategory | NewCategory;

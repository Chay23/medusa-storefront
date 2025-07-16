import { AdminInventoryItem } from '@medusajs/types';
import { AdminCollection } from '../../collections';
import { AdminPrice } from '../../pricing/admin/entities';
import { AdminProductCategory } from '../../product-categories/admin/entities';
import {
	BaseProduct,
	BaseProductOption,
	BaseProductOptionValue,
	BaseProductVariant,
	ProductStatus,
} from '../common';

export type AdminProduct = Omit<BaseProduct, 'categories' | 'variants'> & {
	collection?: AdminCollection | null;
	categories?: AdminProductCategory[] | null;
};

export type AdminProductOption = BaseProductOption & {
	product?: AdminProduct | null;
	values?: AdminProductOptionValue[];
};

export type AdminProductOptionValue = BaseProductOptionValue & {
	option?: AdminProductOption | null;
};

export interface AdminProductVariantInventoryLink {
	Product: {
		variant_id: string;
	};
	Inventory: {
		inventory_item_id: string;
	};
}

export interface AdminProductVariantInventoryItemLink {
	id: string;
	variant_id: string;
	variant?: AdminProductVariant;
	inventory_item_id: string;
	inventory?: AdminInventoryItem;
}

export type AdminProductVariant = BaseProductVariant & {
	prices: AdminPrice[] | null;
	options: AdminProductOptionValue[] | null;
	product?: AdminProduct | null;
	inventory_items?: AdminProductVariantInventoryItemLink[] | null;
};

export type AdminProductStatus = ProductStatus;

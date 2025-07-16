import { BaseCollection } from '../collections/common';
import { FindParams, SearchParams } from '../common';
import { BaseCalculatedPriceSet } from '../pricing/common';

export type ProductStatus = 'draft' | 'proposed' | 'published' | 'rejected';

export type BaseProduct = {
	id: string;
	title: string;
	status: ProductStatus;
	description: string | null;
	handle: string | string[];
	is_giftcard: boolean;
	discountable: boolean;
	thumbnail: string | null;
	collection_id: string | null;
	type_id: string | null;
	weight: string | null;
	length: string | null;
	height: string | null;
	width: string | null;
	material: string | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	collection: BaseCollection | null;
};

export type BaseProductOption = {
	id: string;
	title: string;
	product?: BaseProduct | null;
	product_id?: string | null;
	values?: BaseProductOptionValue[];
	metadata?: Record<string, unknown> | null;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string | null;
};

export type BaseProductOptionValue = {
	id: string;
	value: string;
	option?: BaseProductOption | null;
	option_id?: string | null;
	metadata?: Record<string, unknown> | null;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string | null;
};

export type BaseProductListParams = FindParams &
	SearchParams & {
		status?: ProductStatus | ProductStatus[];
		sales_channel_id?: string | string[];
		title?: string | string[];
		handle?: string | string[];
		id?: string | string[];
		is_giftcard?: boolean;
		tags?: string | string[];
		type_id?: string | string[];
		category_id?: string | string[];
		categories?: string | string[];
		collection_id?: string | string[];
		created_at?: string;
		updated_at?: string;
		deleted_at?: string;
	};

export interface BaseProductVariant {
	id: string;
	title: string | null;
	sku: string | null;
	barcode: string | null;
	ean: string | null;
	upc: string | null;
	allow_backorder: boolean | null;
	manage_inventory: boolean | null;
	inventory_quantity?: number;
	hs_code: string | null;
	origin_country: string | null;
	mid_code: string | null;
	material: string | null;
	weight: number | null;
	length: number | null;
	height: number | null;
	width: number | null;
	variant_rank?: number | null;
	options: BaseProductOptionValue[] | null;
	product?: BaseProduct | null;
	product_id?: string;
	calculated_price?: BaseCalculatedPriceSet;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	metadata?: Record<string, unknown> | null;
}

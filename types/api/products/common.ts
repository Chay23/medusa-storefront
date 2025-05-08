import { BaseCollection } from '../collections/common';

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

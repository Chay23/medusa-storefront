import { BaseProduct } from '../products/common';

export type BaseCollection = {
	id: string;
	title: string;
	handle: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	products?: BaseProduct[];
	metadata: Record<string, unknown> | null;
};

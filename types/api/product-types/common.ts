import { FindParams, SearchParams } from '../common';

export type BaseProductType = {
	id: string;
	value: string;
	created_at: string;
	updated_at: string;
	deleted_at?: string;
	metadata?: Record<string, unknown> | null;
};

export type BaseProductTypeListParams = FindParams &
	SearchParams & {
		id: string | string[];
		value: string | string[];
		created_at?: string;
		updated_at?: string;
	};

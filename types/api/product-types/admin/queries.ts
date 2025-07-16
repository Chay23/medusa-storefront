import { BaseProductTypeListParams } from '../common';

export type AdminProductTypeListParams = BaseProductTypeListParams & {
	deleted_at: string;
};

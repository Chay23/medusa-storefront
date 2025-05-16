import { PaginatedResponse } from '@/types/api/common';
import { AdminCollection } from './entities';

export type AdminCollectionListResponse = PaginatedResponse<{
	collections: AdminCollection[];
}>;

export type AdminCollectionResponse = { collection: AdminCollection };

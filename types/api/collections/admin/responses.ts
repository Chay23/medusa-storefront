import { PaginatedResponse } from '@/types/api/common';
import { AdminCollection } from './entitiies';

export type AdminCollectionListResponse = PaginatedResponse<{
	collections: AdminCollection[];
}>;

export type AdminCollectionResponse = { collection: AdminCollection };

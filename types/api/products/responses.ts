import { PaginatedResponse } from '../common/responses';
import { BaseProduct } from './common';

export type ProductsResponse = PaginatedResponse<{ products: BaseProduct[] }>;

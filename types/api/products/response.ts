import { PaginatedResponse } from "../common/response";
import { BaseProduct } from "./common";

export type ProductsResponse = PaginatedResponse<{ products: BaseProduct[] }>;
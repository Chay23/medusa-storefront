import { PaginatedResponse } from "@/types/common";
import { AdminCollection } from "./entitiies";

export type AdminCollectionListResponse = PaginatedResponse<{collections: AdminCollection[]}>;
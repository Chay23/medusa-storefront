export type PaginatedResponse<T> = {
    limit: number;
    offset: number;
    count: number;
} & T;
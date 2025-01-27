export type PaginationFields = {
	limit: number;
	offset: number;
	count: number;
};

export type PaginatedResponse<T> = PaginationFields & T;

export type FindParams = {
	offset?: number;
	limit?: number;
	order?: string;
};

export type SearchParams = {
	q?: string;
};

export type DateParams = {
	'created_at[$gte]'?: string;
	'updated_at[$gte]'?: string;
	'created_at[$lte]'?: string;
	'updated_at[$lte]'?: string;
};

export type DateParamOptions = keyof DateParams;

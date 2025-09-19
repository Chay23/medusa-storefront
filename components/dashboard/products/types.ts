export type VariantOption = {
	id?: string;
	title: string;
	values: string[];
};

export type CreateProductInputs = {
	title: string;
	subtitle?: string;
	handle?: string;
	description?: string;
	options: VariantOption[];
};

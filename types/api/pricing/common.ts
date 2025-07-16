type Price = {
	id: string | null;
	price_list_id: string | null;
	price_list_type: string | null;
	min_quantity: number | null;
	max_quantity: number | null;
};

export type BaseCalculatedPriceSet = {
	id: string;
	is_calculated_price_price_list?: boolean;
	is_calculated_price_tax_inclusive?: boolean;
	calculated_amount: number | null;
	calculated_amount_with_tax?: number | null;
	calculated_amount_without_tax?: number | null;
	is_original_price_price_list?: boolean;
	is_original_price_tax_inclusive?: boolean;
	original_amount: number | null;
	original_amount_with_tax: number | null;
	original_amount_without_tax: number | null;
	currency_code: string | null;
	calculated_price?: Price;
	original_price?: Price;
};

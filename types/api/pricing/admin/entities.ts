export interface AdminPrice {
	id: string;
	title: string;
	currency_code: string;
	amount: number;
	raw_amount: Record<string, unknown>;
	min_quantity: number | null;
	max_quantity: number | null;
	price_set_id: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

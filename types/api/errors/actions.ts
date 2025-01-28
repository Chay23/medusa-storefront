export type ActionState = {
	success: Boolean;
	errors: Record<string, string>;
	toast: { message: string } | null;
};

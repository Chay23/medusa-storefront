export type ActionState = {
	success: Boolean;
	toast: { message: string } | null;
};

export type ActionStateWithValidation = ActionState & {
	errors: Record<string, string>;
};

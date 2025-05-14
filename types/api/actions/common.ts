export type ActionState = {
	success: boolean;
	toast: { message: string } | null;
};

export type ActionStateWithValidation = ActionState & {
	errors: Record<string, string>;
};

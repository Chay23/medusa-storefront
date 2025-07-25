export type WithUndefined<T> = {
	[K in keyof T]: T[K] | undefined;
};

export type MakeRequired<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;

export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>;

// used to infer complex type
export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

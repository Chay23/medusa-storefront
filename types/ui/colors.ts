export type ColorVariants =
	| 'default'
	| 'primary'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'danger';

export type ColorMap = {
	[K in ColorVariants]?: string;
};

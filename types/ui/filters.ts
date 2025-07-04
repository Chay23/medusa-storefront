export type FilterOption = {
	key: string;
	label: string;
};

export type SelectFilter = {
	type: 'select';
	key: string;
	label: string;
	options: FilterOption[];
	selectionMode: 'none' | 'single' | 'multiple';
	openOnMount?: boolean;
};

export type DateFilter = {
	type: 'date';
	key: string;
	label: string;
	dayOptions: number[];
	openOnMount?: boolean;
};

export type Filter = SelectFilter | DateFilter;

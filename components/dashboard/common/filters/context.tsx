import { createContext, ReactNode, useContext } from 'react';

type FilterContextProps = {
	removeFilter: (key: string) => void;
	removeAllFilters: () => void;
};

export const TableFiltersContext = createContext<FilterContextProps | null>(
	null
);

export const useTableFilterContext = () => {
	const ctx = useContext(TableFiltersContext);
	if (!ctx) {
		throw new Error('Component must be used within a TableFiltersContext');
	}
	return ctx;
};

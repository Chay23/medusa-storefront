import type { UI } from '@/types/ui';
import type { ReadonlyURLSearchParams } from 'next/navigation';

export const getInitialFilters = ({
	searchParams,
	filters,
}: {
	searchParams: ReadonlyURLSearchParams;
	filters: UI.Filter[];
}) => {
	const params = new URLSearchParams(searchParams);
	const tempFilters: UI.Filter[] = [];
	params.forEach((_, key) => {
		const filter = filters.find((f) => f.key === key);
		if (filter) {
			tempFilters.push({ ...filter, openOnMount: false } as UI.Filter);
		}
	});
	return tempFilters;
};

export const removeAllFilterParams = (filters: UI.Filter[]) => {
	return filters.reduce((obj: Record<string, null>, f) => {
		obj[f.key] = null;
		return obj;
	}, {} as Record<string, null>);
};

import type { UI } from '@/types/ui';
import type { ReadonlyURLSearchParams } from 'next/navigation';

export const getInitialFilters = ({
	searchParams,
	filters,
	invalidParams,
}: {
	searchParams: ReadonlyURLSearchParams;
	filters: UI.Filter[];
	invalidParams: string[];
}) => {
	const params = new URLSearchParams(searchParams);
	const initialFilters: UI.Filter[] = [];
	params.forEach((_, paramKey) => {
		if (invalidParams.includes(paramKey)) {
			return;
		}
		const filter = filters.find((f) => f.key === paramKey);
		if (filter) {
			initialFilters.push({ ...filter, openOnMount: false } as UI.Filter);
		}
	});
	return initialFilters;
};

export const removeAllFilterParams = (filters: UI.Filter[]) => {
	return filters.reduce((obj: Record<string, null>, f) => {
		obj[f.key] = null;
		return obj;
	}, {} as Record<string, null>);
};

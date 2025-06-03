import type { Api } from '@/types/api';

import CategoriesTable from './Table';
import CategoriesFilters from './Filters';
import Error from '../../UI/error/Error';

import { getCategories } from '@/lib/dashboard/data/categories';

type Props = {
	page: number;
	searchQueries: Api.AdminProductCategoryListParams;
};

export default async function Categories({ page, searchQueries }: Props) {
	const { q } = searchQueries;
	const categoriesRes = await getCategories(page, {
		q: q || '',
	});

	if (!categoriesRes.success) {
		return <Error error={categoriesRes.error} />;
	}
	return (
		<>
			<CategoriesFilters />
			<CategoriesTable categoriesRes={categoriesRes.data} />
		</>
	);
}

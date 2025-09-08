import { getCategories } from '@/lib/dashboard/data/categories';
import type { Api } from '@/types/api';

import CategoriesFilters from './Filters';
import CategoriesTable from './Table';
import Error from '../../UI/error/Error';

type Props = {
	searchParams: { [key: string]: string | undefined };
};

export default async function Categories({ searchParams }: Props) {
	const { q, page } = searchParams;
	const _page = parseInt(page || '1');

	const categoriesRes = await getCategories(_page, {
		q: q || '',
	});

	if (!categoriesRes.success) {
		return <Error error={categoriesRes.error} />;
	}
	return (
		<>
			<CategoriesFilters />
			<CategoriesTable categoriesRes={categoriesRes.data} page={_page} />
		</>
	);
}

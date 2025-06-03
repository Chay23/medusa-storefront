import CreateCategory from '@/components/dashboard/product-categories/create/CreateCategory';

import { getAllCategories } from '@/lib/dashboard/data/categories';

export default async function Create() {
	const getCategoriesPromise = getAllCategories({
		include_descendants_tree: true,
	});

	return <CreateCategory categoriesPromise={getCategoriesPromise} />;
}

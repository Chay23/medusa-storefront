import CreateCategory from '@/components/dashboard/product-categories/create/CreateCategory';
import Error from '@/components/dashboard/UI/error/Error';

import { getAllCategories } from '@/lib/dashboard/data/categories';

export default async function Create() {
	const categoriesRes = await getAllCategories({
		include_descendants_tree: true,
	});

	if (!categoriesRes.success) {
		return <Error error={categoriesRes.error} />;
	}

	return <CreateCategory categories={categoriesRes.data.product_categories} />;
}

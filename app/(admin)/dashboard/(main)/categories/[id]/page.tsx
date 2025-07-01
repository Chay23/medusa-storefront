import { getCategory } from '@/lib/dashboard/data/categories';
import { Suspense } from 'react';

import Category from '@/components/dashboard/product-categories/details/Category';
import LoadingSectionHeader from '@/components/dashboard/UI/loading/details/LoadingSectionHeader';
import LoadingBreadcrumbs from '@/components/dashboard/UI/loading/LoadingBreadcrumbs';

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
	const { id } = await params;
	const { error, data } = await getCategory(id);

	if (!error)
		return {
			title: 'Category: ' + data.product_category.name + ' | Dashboard',
		};
}

export default async function CategoryPage({ params }: Props) {
	const { id } = await params;

	return (
		<Suspense
			fallback={
				<>
					<LoadingBreadcrumbs />
					<LoadingSectionHeader />
				</>
			}
		>
			<Category id={id} />
		</Suspense>
	);
}

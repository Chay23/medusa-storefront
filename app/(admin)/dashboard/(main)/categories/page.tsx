import { Suspense } from 'react';

import Categories from '@/components/dashboard/product-categories/list/Categories';
import CategoriesBreadcrumbs from '@/components/dashboard/product-categories/list/CategoriesBreadcrumbs';
import CategoriesHeader from '@/components/dashboard/product-categories/list/CategoriesHeader';
import LoadingTable from '@/components/dashboard/UI/loading/LoadingTable';

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page({ searchParams }: Props) {
	return (
		<>
			<CategoriesBreadcrumbs />
			<section className='content-container'>
				<CategoriesHeader />
				<Suspense fallback={<LoadingTable />}>
					<Categories searchParams={await searchParams} />
				</Suspense>
			</section>
		</>
	);
}

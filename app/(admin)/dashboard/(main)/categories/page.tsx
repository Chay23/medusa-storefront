import { Suspense } from 'react';

import Categories from '@/components/dashboard/product-categories/list/Categories';
import CategoriesBreadcrumbs from '@/components/dashboard/product-categories/list/CategoriesBreadcrumbs';
import CategoriesHeader from '@/components/dashboard/product-categories/list/CategoriesHeader';
import { DataTableControlsSkeleton } from '@/components/dashboard/UI/loading/data-table-controls.skeleton';
import TableSkeleton from '@/components/dashboard/UI/loading/table.skeleton';

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page({ searchParams }: Props) {
	return (
		<>
			<CategoriesBreadcrumbs />
			<section className='content-container'>
				<CategoriesHeader />
				<Suspense
					fallback={
						<>
							<DataTableControlsSkeleton /> <TableSkeleton />
						</>
					}
				>
					<Categories searchParams={await searchParams} />
				</Suspense>
			</section>
		</>
	);
}

import Categories from '@/components/dashboard/product-categories/list/Categories';
import CategoriesBreadcrumbs from '@/components/dashboard/product-categories/list/CategoriesBreadcrumbs';
import CategoriesHeader from '@/components/dashboard/product-categories/list/CategoriesHeader';
import LoadingTable from '@/components/dashboard/UI/loading/LoadingTable';
import { Suspense } from 'react';

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page({ searchParams }: Props) {
	const { page, q } = await searchParams;
	const _page = parseInt(page || '1');

	return (
		<>
			<CategoriesBreadcrumbs />
			<section className='content-container'>
				<CategoriesHeader />
				<Suspense fallback={<LoadingTable />}>
					<Categories page={_page} searchQueries={{ q }} />
				</Suspense>
			</section>
		</>
	);
}

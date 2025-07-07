import type { HttpTypes } from '@medusajs/types';
import type { WithUndefined } from '@/types/utils/common';

import { getProducts } from '@/lib/dashboard/data/products';

import ProductFilters from '@/components/dashboard/common/products/Filters';
import ProductsTable from '@/components/dashboard/common/products/Table';
import ProductsHeader from '@/components/dashboard/products/ProductsHeader';
import Error from '@/components/dashboard/UI/error/Error';
import LoadingTable from '@/components/dashboard/UI/loading/LoadingTable';
import { Suspense } from 'react';

type SearchParams = WithUndefined<HttpTypes.AdminProductListParams>;

type Props = {
	searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
	const params = await searchParams;
	const productsRes = await getProducts(1, params);

	if (!productsRes.success) {
		return <Error error={productsRes.error} />;
	}

	return (
		<section className='content-container'>
			<ProductsHeader />
			<Suspense fallback={<LoadingTable />}>
				<ProductFilters />
				<ProductsTable productsRes={productsRes.data} />
			</Suspense>
		</section>
	);
}

import type { HttpTypes } from '@medusajs/types';
import type { WithUndefined } from '@/types/utils/common';

import { getProducts } from '@/lib/dashboard/data/products';
import { validateQueryParams } from '@/lib/common/utils/params';

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
	const { validParams, invalidParams } = validateQueryParams(params, {
		obj: ['created_at', 'updated_at'],
	});

	const productsRes = await getProducts(1, validParams);

	if (!productsRes.success) {
		return <Error error={productsRes.error} />;
	}

	return (
		<section className='content-container'>
			<ProductsHeader />
			<Suspense fallback={<LoadingTable />}>
				<ProductFilters invalidFilterParams={invalidParams} />
				<ProductsTable productsRes={productsRes.data} />
			</Suspense>
		</section>
	);
}

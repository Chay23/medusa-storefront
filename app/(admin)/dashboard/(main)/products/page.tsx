import type { HttpTypes } from '@medusajs/types';

import { Suspense } from 'react';

import ProductDataTableControls from '@/components/dashboard/common/products/ProductDataTableControls';
import ProductsTable from '@/components/dashboard/common/products/Table';
import ProductsHeader from '@/components/dashboard/products/ProductsHeader';
import Error from '@/components/dashboard/UI/error/Error';
import { validateQueryParams } from '@/lib/common/utils/params';
import { getProducts } from '@/lib/dashboard/data/products';
import type { WithUndefined } from '@/types/utils/common';
import { DataTableControlsSkeleton } from '@/components/dashboard/UI/loading/data-table-controls.skeleton';
import TableSkeleton from '@/components/dashboard/UI/loading/table.skeleton';

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
			<Suspense
				fallback={
					<>
						<DataTableControlsSkeleton /> <TableSkeleton />
					</>
				}
			>
				<ProductDataTableControls invalidFilterParams={invalidParams} />
				<ProductsTable productsRes={productsRes.data} />
			</Suspense>
		</section>
	);
}

import type { HttpTypes } from '@medusajs/types';

import { Suspense } from 'react';

import ProductDataTableControls from '@/components/dashboard/common/products/ProductDataTableControls';
import Products from '@/components/dashboard/common/products/products';
import ProductsHeader from '@/components/dashboard/products/ProductsHeader';
import { DataTableControlsSkeleton } from '@/components/dashboard/UI/loading/data-table-controls.skeleton';
import TableSkeleton from '@/components/dashboard/UI/loading/table.skeleton';
import { validateQueryParams } from '@/lib/common/utils/params';
import type { WithUndefined } from '@/types/utils/common';

type SearchParams = WithUndefined<HttpTypes.AdminProductListParams>;

type Props = {
	searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
	const params = await searchParams;

	const { validParams, invalidParams } = validateQueryParams(params, {
		obj: ['created_at', 'updated_at'],
	});

	return (
		<section className='content-container'>
			<ProductsHeader />
			<Suspense fallback={<DataTableControlsSkeleton />}>
				<ProductDataTableControls invalidFilterParams={invalidParams} />
			</Suspense>
			<Suspense
				key={Object.values(params).toString()}
				fallback={<TableSkeleton />}
			>
				<Products params={validParams} />
			</Suspense>
		</section>
	);
}

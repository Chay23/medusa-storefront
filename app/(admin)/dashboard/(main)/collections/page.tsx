import { Suspense } from 'react';

import Collections from '@/components/dashboard/collections/list/collections';
import CollectionsBreadcrumbs from '@/components/dashboard/collections/list/collections-breadcrumbs';
import CollectionsHeader from '@/components/dashboard/collections/list/collections-header';
import CollectionsFilters from '@/components/dashboard/collections/list/collections-table-filters';
import { DataTableControlsSkeleton } from '@/components/dashboard/UI/loading/data-table-controls.skeleton';
import TableSkeleton from '@/components/dashboard/UI/loading/table.skeleton';

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page({ searchParams }: Props) {
	return (
		<>
			<CollectionsBreadcrumbs />
			<section className='content-container'>
				<CollectionsHeader />
				<Suspense
					fallback={
						<>
							<DataTableControlsSkeleton />
							<TableSkeleton />
						</>
					}
				>
					<CollectionsFilters />
					<Collections searchParams={await searchParams} />
				</Suspense>
			</section>
		</>
	);
}

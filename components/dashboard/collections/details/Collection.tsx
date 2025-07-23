'use client';

import { useEffect, useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { paths } from '@/config/paths';
import { ID_COLLECTION_EDIT } from '@/lib/dashboard/constants';
import { useDrawers } from '@/store/dashboard/drawers';
import { useModals } from '@/store/dashboard/modals';
import type { AdminCollection } from '@/types/api/collections';
import type { ProductsResponse } from '@/types/api/products';
import type { Breadcrumb } from '@/types/common/breadcrumbs';

import CollectionActions from './CollectionActions';
import EditCollectionDrawer from './EditCollectionDrawer';
import ProductsTable from '../../common/products/Table';
import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';
import SectionHeader from '../../UI/common/sections/SectionHeader';
import DeleteCollectionModal from '../delete/DeleteCollectionModal';

type Props = {
	collection: AdminCollection;
	productsRes: ProductsResponse;
};

export default function Collection({ collection, productsRes }: Props) {
	const searchParams = useSearchParams();
	const showDrawer = searchParams.get('edit') === 'true' ? true : false;
	const onDeleteModalOpen = useModals((state) => state.openModal);
	const onEditDrawerOpen = useDrawers((state) => state.openDrawer);

	const breadcrumbs: Breadcrumb[] = useMemo(
		() => [
			{
				title: 'Collections',
				href: paths.dashboard.collections.getHref(),
			},
			{
				title: collection.title,
				href: paths.dashboard.collection.getHref(collection.id),
			},
		],
		[collection.title, collection.id]
	);

	useEffect(() => {
		if (showDrawer) {
			onEditDrawerOpen(ID_COLLECTION_EDIT);
		}
	}, []);

	return (
		<>
			<DeleteCollectionModal collection={collection} />
			<EditCollectionDrawer collection={collection} />
			<Breadcrumbs items={breadcrumbs} />
			<div className='flex flex-col gap-9'>
				<section className='content-container'>
					<SectionHeader
						title={collection.title}
						className='mb-1'
						endContent={
							<CollectionActions
								onDeleteModalOpen={onDeleteModalOpen}
								onEditDrawerOpen={onEditDrawerOpen}
							/>
						}
					/>
					<div className='grid grid-cols-2'>
						<div>Handle</div>
						<div className='text-foreground-500'>/{collection.handle}</div>
					</div>
				</section>
				<section className='content-container'>
					<SectionHeader
						title='Products'
						className='mb-3'
						endContent={
							<div className='self-center cursor-pointer'>
								<MoreHorizIcon />
							</div>
						}
					/>
					<ProductsTable productsRes={productsRes} />
				</section>
			</div>
		</>
	);
}

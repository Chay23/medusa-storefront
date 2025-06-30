'use client';

import type { AdminCollection } from '@/types/api/collections';
import type { ProductsResponse } from '@/types/api/products';
import type { Breadcrumb } from '@/types/common/breadcrumbs';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useModals } from '@/store/dashboard/modals';
import { useDrawers } from '@/store/dashboard/drawers';

import SectionHeader from '../../UI/common/SectionHeader';
import ProductsTable from '../../common/products/Table';
import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/react';
import EditCollectionDrawer from './EditCollectionDrawer';
import DeleteCollectionModal from '../delete/DeleteCollectionModal';

import {
	ID_COLLECTION_DELETE,
	ID_COLLECTION_EDIT,
} from '@/lib/dashboard/constants';
import { paths } from '@/config/paths';

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
		[collection.title]
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
						endContent={
							<Dropdown>
								<DropdownTrigger>
									<div className='self-center cursor-pointer'>
										<MoreHorizIcon />
									</div>
								</DropdownTrigger>
								<DropdownMenu aria-label='Collection actions'>
									<DropdownItem
										key='edit'
										onPress={() => onEditDrawerOpen(ID_COLLECTION_EDIT)}
									>
										Edit
									</DropdownItem>
									<DropdownItem
										key='delete'
										onPress={() => onDeleteModalOpen(ID_COLLECTION_DELETE)}
									>
										Delete
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
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

'use client';

import type { AdminCollection } from '@/types/api/collections';
import type { ProductsResponse } from '@/types/api/products';
import type { Breadcrumb } from '@/types/common/breadcrumbs';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useModals } from '@/store/dashboard/modals';

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
import EditCollection from './EditCollection';
import DeleteCollectionModal from '../delete/DeleteCollectionModal';

import { ID_COLLECTION_DELETE } from '@/lib/dashboard/contants';
import { paths } from '@/config/paths';

type Props = {
	collection: AdminCollection;
	productsRes: ProductsResponse;
};

export default function Collection({ collection, productsRes }: Props) {
	const searchParams = useSearchParams();
	const showDrawer = searchParams.get('edit') === 'true' ? true : false;
	const [isOpenDrawer, setIsOpenDrawer] = useState(showDrawer || false);
	const onDeleteModalOpen = useModals((state) => state.openModal);

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

	const handleToggleEditDrawer = () => {
		return setIsOpenDrawer((prevState) => !prevState);
	};

	return (
		<>
			<DeleteCollectionModal collection={collection} />
			<Breadcrumbs items={breadcrumbs} />
			<EditCollection
				collection={collection}
				openDrawer={isOpenDrawer}
				onToggleDrawer={handleToggleEditDrawer}
			/>
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
									<DropdownItem key='edit' onPress={handleToggleEditDrawer}>
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

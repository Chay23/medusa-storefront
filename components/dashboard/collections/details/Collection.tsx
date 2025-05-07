'use client';

import type { AdminCollection } from '@/types/api/collections';
import type { ProductsResponse } from '@/types/api/products';
import type { Breadcrumb } from '@/types/common/breadcrumbs';

import { useMemo, useState } from 'react';

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
import { useSearchParams } from 'next/navigation';

type Props = {
	collection: AdminCollection;
	productsRes: ProductsResponse;
};

export default function Collection({ collection, productsRes }: Props) {
	const searchParams = useSearchParams();
	const showDrawer = searchParams.get('edit') === 'true' ? true : false;
	const [openDrawer, setOpenDrawer] = useState(showDrawer || false);

	const breadcrumbs: Breadcrumb[] = useMemo(
		() => [
			{
				title: 'Collections',
				href: '/dashboard/collections',
			},
			{
				title: collection.title,
				href: `/dashboard/collections/${collection.id}`,
			},
		],
		[collection.title]
	);

	const handleToggleEditDrawer = () => {
		return setOpenDrawer((prevState) => !prevState);
	};

	return (
		<>
			<Breadcrumbs items={breadcrumbs} />
			<EditCollection
				collection={collection}
				openDrawer={openDrawer}
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

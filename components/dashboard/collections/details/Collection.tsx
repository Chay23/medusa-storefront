'use client';

import type { AdminCollection } from '@/types/api/collections';
import type { ProductsResponse } from '@/types/api/products';
import type { Breadcrumb } from '@/types/common/breadcrumbs';

import { useMemo } from 'react';

import SectionHeader from '../../UI/common/SectionHeader';
import ProductsTable from '../../common/products/Table';
import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type Props = {
	collection: AdminCollection;
	productsRes: ProductsResponse;
};

export default function Collection({ collection, productsRes }: Props) {
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
		[]
	);
	return (
		<>
			<Breadcrumbs items={breadcrumbs}/>
			<div className='flex flex-col gap-9'>
				<section className='content-container'>
					<SectionHeader
						title={collection.title}
						endContent={
							<div className='self-center cursor-pointer'>
								<MoreHorizIcon />
							</div>
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

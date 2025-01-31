'use client';

import type { Api } from '@/types/api';
import type { Breadcrumb } from '@/types/common/breadcrumbs';

import { Button, Link } from '@heroui/react';
import CollectionsFilters from './Filters';
import CollectionsTable from './Table';
import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';

type Props = {
	collectionsRes: Api.AdminCollectionListResponse;
};

const breadcrumbs: Breadcrumb[] = [
	{
		title: 'Collections',
		href: '/dashboard/collections',
	},
];

export default function Collections({ collectionsRes }: Props) {
	return (
		<>
			<Breadcrumbs items={breadcrumbs} />
			<section className='content-container'>
				<div className='flex justify-between mb-7'>
					<h2>Collections</h2>
					<Button
						as={Link}
						role='link'
						href='/dashboard/collections/create'
						color='primary'
					>
						Create Collection
					</Button>
				</div>
				<CollectionsFilters />
				<CollectionsTable collectionsRes={collectionsRes} />
			</section>
		</>
	);
}

'use client';

import type { AdminCollection } from '@/types/api/collections';
import type { Api } from '@/types/api';
import type { Breadcrumb } from '@/types/common/breadcrumbs';

import { useState } from 'react';
import { useModals } from '@/store/dashboard/modals';

import { Button, Link } from '@heroui/react';
import CollectionsFilters from './Filters';
import CollectionsTable from './Table';
import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';
import DeleteCollectionModal from '../delete/DeleteCollectionModal';

import { ID_COLLECTION_DELETE } from '@/lib/dashboard/contants';

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
	const onOpenDeleteModal = useModals((state) => state.openModal);
	const [selectedCollection, setSelectedCollection] =
		useState<AdminCollection | null>(null);

	const handleDeleteModalOpen = (collection: AdminCollection) => {
		onOpenDeleteModal(ID_COLLECTION_DELETE);
		setSelectedCollection(collection);
	};

	return (
		<>
			{selectedCollection && (
				<DeleteCollectionModal collection={selectedCollection} revalidateList />
			)}
			<Breadcrumbs items={breadcrumbs} />
			<section className='content-container'>
				<div className='flex justify-between mb-7'>
					<h2>Collections</h2>
					<Button
						as={Link}
						href='/dashboard/collections/create'
						color='primary'
					>
						Create Collection
					</Button>
				</div>
				<CollectionsFilters />
				<CollectionsTable
					collectionsRes={collectionsRes}
					onDeleteModalOpen={handleDeleteModalOpen}
				/>
			</section>
		</>
	);
}

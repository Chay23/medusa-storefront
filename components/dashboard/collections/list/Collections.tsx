'use client';

import type { AdminCollection } from '@/types/api/collections';
import type { Api } from '@/types/api';
import type { Breadcrumb } from '@/types/common/breadcrumbs';

import { useState } from 'react';
import { useModals } from '@/store/dashboard/modals';

import CollectionsFilters from './Filters';
import CollectionsTable from './Table';
import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';
import DeleteCollectionModal from '../delete/DeleteCollectionModal';
import CollectionsHeader from './CollectionsHeader';

import { ID_COLLECTION_DELETE } from '@/lib/dashboard/constants';
import { paths } from '@/config/paths';

type Props = {
	collectionsRes: Api.AdminCollectionListResponse;
};

const breadcrumbs: Breadcrumb[] = [
	{
		title: 'Collections',
		href: paths.dashboard.collections.getHref(),
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
				<CollectionsHeader />
				<CollectionsFilters />
				<CollectionsTable
					collectionsRes={collectionsRes}
					onDeleteModalOpen={handleDeleteModalOpen}
				/>
			</section>
		</>
	);
}

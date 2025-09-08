'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Pagination,
	SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { paths } from '@/config/paths';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { ID_COLLECTION_DELETE } from '@/lib/dashboard/constants';
import { getListDateString } from '@/lib/dashboard/utils/date';
import { useModals } from '@/store/dashboard/modals';
import type { Api } from '@/types/api';
import type { AdminCollection } from '@/types/api/collections';

import ResultsCount from '../../UI/table/ResultsCount';
import DeleteCollectionModal from '../delete/DeleteCollectionModal';

type Props = {
	collectionsRes: Api.AdminCollectionListResponse;
	page: number;
};

export default function CollectionsTable({ collectionsRes, page }: Props) {
	const searchParams = useSearchParams();

	const onOpenDeleteModal = useModals((state) => state.openModal);
	const [selectedCollection, setSelectedCollection] =
		useState<AdminCollection | null>(null);

	const getSortOrder = () => {
		const order = searchParams.get('order');
		if (order) {
			return order.match(/^-/) ? 'descending' : 'ascending';
		}
		return 'descending'; // default order is descending by 'created_at'
	};

	const { updateParams } = useUpdateParams();
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: '',
		direction: getSortOrder(),
	});

	const { offset, limit, count, collections } = collectionsRes;

	const onDeleteModalOpen = (collection: AdminCollection) => {
		onOpenDeleteModal(ID_COLLECTION_DELETE);
		setSelectedCollection(collection);
	};

	const handlePageChange = (page: number) => {
		updateParams({ page: page.toString() });
	};

	const handleSort = (sortOption: SortDescriptor) => {
		setSortDescriptor(() => sortOption);

		if (sortOption.direction === 'descending') {
			return updateParams({ order: `-${sortOption.column}` });
		}

		updateParams({ order: `${sortOption.column}` });
	};

	return (
		<>
			{selectedCollection && (
				<DeleteCollectionModal collection={selectedCollection} />
			)}
			<Table
				aria-label='Collections table'
				removeWrapper
				sortDescriptor={sortDescriptor}
				onSortChange={handleSort}
			>
				<TableHeader>
					<TableColumn>Title</TableColumn>
					<TableColumn>Handle</TableColumn>
					<TableColumn>Products</TableColumn>
					<TableColumn allowsSorting key='created_at'>
						Created
					</TableColumn>
					<TableColumn allowsSorting key='updated_at'>
						Updated
					</TableColumn>
					<TableColumn>
						<></>
					</TableColumn>
				</TableHeader>
				<TableBody emptyContent='No Results Found'>
					{collections.map((collection) => {
						const productsAmount = collection.products?.length;
						return (
							<TableRow
								key={collection.id}
								as={Link}
								href={paths.dashboard.collection.getHref(collection.id)}
								className='cursor-pointer transition-background duration-300 hover:bg-background border-b border-foreground-100'
							>
								<TableCell>{collection.title}</TableCell>
								<TableCell>{collection.handle}</TableCell>
								<TableCell>
									{collection.products ? productsAmount : '-'}
								</TableCell>
								<TableCell>
									{getListDateString(collection.created_at)}
								</TableCell>
								<TableCell>
									{getListDateString(collection.updated_at)}
								</TableCell>
								<TableCell>
									<Dropdown>
										<DropdownTrigger>
											<div className='self-center cursor-pointer'>
												<MoreHorizIcon />
											</div>
										</DropdownTrigger>
										<DropdownMenu aria-label='Collection actions'>
											<DropdownItem
												key='edit'
												href={`${paths.dashboard.collection.getHref(
													collection.id
												)}?edit=true`}
												startContent={<ModeEditOutlineOutlinedIcon />}
											>
												Edit
											</DropdownItem>
											<DropdownItem
												key='delete'
												onPress={() => onDeleteModalOpen(collection)}
												startContent={<DeleteOutlineOutlinedIcon />}
											>
												Delete
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<div className='flex justify-between mt-6'>
				<ResultsCount limit={limit} offset={offset} count={count} />
				<Pagination
					showControls
					page={page}
					total={Math.ceil(count / limit)}
					onChange={handlePageChange}
				/>
			</div>
		</>
	);
}

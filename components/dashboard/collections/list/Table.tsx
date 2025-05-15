'use client';

import type { Api } from '@/types/api';
import type { AdminCollection } from '@/types/api/collections';

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
import ResultsCount from '../../UI/table/ResultsCount';
import Link from 'next/link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { formatDate } from '@/lib/dashboard/list/utils';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { paths } from '@/config/paths';

type Props = {
	collectionsRes: Api.AdminCollectionListResponse;
	onDeleteModalOpen: (collection: AdminCollection) => void;
};

export default function CollectionsTable({
	collectionsRes,
	onDeleteModalOpen,
}: Props) {
	const searchParams = useSearchParams();

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
	const page = parseInt(searchParams.get('page') || '1');

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
								<TableCell>{formatDate(collection.created_at)}</TableCell>
								<TableCell>{formatDate(collection.updated_at)}</TableCell>
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
											>
												Edit
											</DropdownItem>
											<DropdownItem
												key='delete'
												onPress={() => onDeleteModalOpen(collection)}
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

import type { Api } from '@/types/api';

import {
	Pagination,
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
import { useSearchParams, useRouter } from 'next/navigation';

type Props = {
	collectionsRes: Api.AdminCollectionListResponse;
};

export default function CollectionsTable({ collectionsRes }: Props) {
	const { offset, limit, count, collections } = collectionsRes;
	const searchParams = useSearchParams();

	const page = parseInt(searchParams.get('page') || '1');
	const router = useRouter();

	const handlePageChange = (page: number) => {
		router.replace(`/dashboard/collections?page=${page}`);
	};

	return (
		<div>
			<Table aria-label='Collections table' removeWrapper>
				<TableHeader>
					<TableColumn>Title</TableColumn>
					<TableColumn>Handle</TableColumn>
					<TableColumn>Products</TableColumn>
					<TableColumn>Updated</TableColumn>
					<TableColumn>
						<></>
					</TableColumn>
				</TableHeader>
				<TableBody emptyContent="No Results Found">
					{collections.map((collection) => {
						const productsAmount = collection.products?.length;
						const updated = collection.updated_at
							? new Date(collection.updated_at).toLocaleDateString('en-US', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
							  })
							: '-';

						return (
							<TableRow
								key={collection.id}
								as={Link}
								href={`/dashboard/collections/${collection.id}`}
								className='cursor-pointer transition-background duration-300 hover:bg-background border-b border-foreground-100'
							>
								<TableCell>{collection.title}</TableCell>
								<TableCell>{collection.handle}</TableCell>
								<TableCell>
									{collection.products ? productsAmount : '-'}
								</TableCell>
								<TableCell>{updated}</TableCell>
								<TableCell>
									<button>
										<MoreHorizIcon />
									</button>
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
		</div>
	);
}

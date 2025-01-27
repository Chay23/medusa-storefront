import type { Api } from '@/types/api';

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/react';
import ResultsCount from '../UI/table/ResultsCount';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type Props = {
	collectionsRes: Api.AdminCollectionListResponse;
};

export default function CollectionsTable({ collectionsRes }: Props) {
	const { offset, limit, count, collections } = collectionsRes;

	return (
		<div>
			<Table aria-label='Collections table'>
				<TableHeader>
					<TableColumn>Name</TableColumn>
					<TableColumn>Handle</TableColumn>
					<TableColumn>Created</TableColumn>
					<TableColumn>Updated</TableColumn>
					<TableColumn>
						<></>
					</TableColumn>
				</TableHeader>
				<TableBody>
					{collections.map((collection) => {
						const created = collection.created_at
							? new Date(collection.created_at).toLocaleDateString('en-US', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
							  })
							: '-';

						const updated = collection.updated_at
							? new Date(collection.updated_at).toLocaleDateString('en-US', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
							  })
							: '-';

						return (
							<TableRow key={collection.id}>
								<TableCell>{collection.title}</TableCell>
								<TableCell>{collection.handle}</TableCell>
								<TableCell>{created}</TableCell>
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
			<ResultsCount
				limit={limit}
				offset={offset}
				count={count}
				classNames='mt-3'
			/>
		</div>
	);
}

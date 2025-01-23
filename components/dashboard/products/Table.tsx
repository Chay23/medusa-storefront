import type { Api } from '@/types/api';

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type Props = {
	productsRes: Api.ProductsResponse;
};

export default function ProductsTable({ productsRes }: Props) {
	const { products, offset, limit, count } = productsRes;
	const resultsStart = offset + 1;
	const resultsEnd = offset + limit > count ? count : offset + limit;

	return (
		<div>
			<Table selectionMode='multiple' aria-label='Products table'>
				<TableHeader>
					<TableColumn>Name</TableColumn>
					<TableColumn>Created</TableColumn>
					<TableColumn>Collection</TableColumn>
					<TableColumn>Status</TableColumn>
					<TableColumn>
						<></>
					</TableColumn>
				</TableHeader>
				<TableBody>
					{products.map((product) => {
						const created = product.created_at
							? new Date(product.created_at).toLocaleDateString('en-US', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
							  })
							: '-';
						const collection = product.collection?.title ?? '-';

						return (
							<TableRow key={product.id}>
								<TableCell>{product.title}</TableCell>
								<TableCell>{created}</TableCell>
								<TableCell>{collection}</TableCell>
								<TableCell className='capitalize'>{product.status}</TableCell>
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
			<div className='mt-3'>
				Results: {resultsStart} - {resultsEnd} of {count}
			</div>
		</div>
	);
}

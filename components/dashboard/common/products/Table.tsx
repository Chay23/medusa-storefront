'use client';

import type { Api } from '@/types/api';

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/react';
import ResultsCount from '../../UI/table/ResultsCount';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type Props = {
	productsRes: Api.ProductsResponse;
};

export default function ProductsTable({ productsRes }: Props) {
	const { products, offset, limit, count } = productsRes;

	return (
		<div>
			<Table aria-label='Products table' removeWrapper>
				<TableHeader>
					<TableColumn>Name</TableColumn>
					<TableColumn>Created</TableColumn>
					<TableColumn>Collection</TableColumn>
					<TableColumn>Status</TableColumn>
					<TableColumn>
						<></>
					</TableColumn>
				</TableHeader>
				<TableBody emptyContent='No products found'>
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
			<ResultsCount
				limit={limit}
				offset={offset}
				count={count}
				classNames='mt-3'
			/>
		</div>
	);
}

'use client';

import type { Api } from '@/types/api';

import { Button } from '@heroui/react';
import SectionHeader from '../UI/common/SectionHeader';
import ProductsTable from '../common/products/Table';

type Props = {
	productsRes: Api.ProductsResponse;
};

export default function Products({ productsRes }: Props) {
	return (
		<section className='content-container'>
			<SectionHeader
				title='Products'
				endContent={
					<div>
						<Button color='primary'>Add Product</Button>
					</div>
				}
			/>
			<ProductsTable productsRes={productsRes} />
		</section>
	);
}

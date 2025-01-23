'use client';

import type { Api } from '@/types/api';

import { Button } from '@heroui/react';
import Filters from './Filters';
import ProductsTable from './Table';

type Props = {
	productsRes: Api.ProductsResponse;
};

export default function Products({ productsRes }: Props) {
	return (
		<section className='content-container'>
			<div className='flex justify-between mb-7'>
				<h2>Products</h2>
				<div>
					<Button color='primary'>Add Product</Button>
				</div>
			</div>
			<Filters />
			<ProductsTable productsRes={productsRes} />
		</section>
	);
}

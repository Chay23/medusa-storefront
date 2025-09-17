import { HttpTypes } from '@medusajs/types';

import { getProducts } from '@/lib/dashboard/data/products';
import { WithUndefined } from '@/types/utils/common';

import ProductsTable from './Table';
import Error from '../../UI/error/Error';

type SearchParams = WithUndefined<HttpTypes.AdminProductListParams>;

type Props = {
	params: SearchParams;
};

export default async function Products({ params }: Props) {
	const productsRes = await getProducts(1, params);

	if (!productsRes.success) {
		return <Error error={productsRes.error} />;
	}

	return <ProductsTable productsRes={productsRes.data} />;
}

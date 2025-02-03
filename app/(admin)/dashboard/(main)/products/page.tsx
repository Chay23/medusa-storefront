import Products from '@/components/dashboard/products/Products';
import Error from '@/components/dashboard/UI/error/Error';
import { getProducts } from '@/lib/dashboard/data/products';

export default async function Page({}) {
	const productsRes = await getProducts(1, { limit: 12 });

	if (!productsRes.success) {
		return <Error error={productsRes.error} />;
	}

	return <Products productsRes={productsRes.data} />;
}

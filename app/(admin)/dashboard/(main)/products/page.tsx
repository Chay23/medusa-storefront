import Products from '@/components/dashboard/products/Products';
import { getProducts } from '@/lib/dashboard/data/products';

export default async function Page({}) {
	const productsRes = await getProducts(1, { limit: 12 });

	return <Products productsRes={productsRes} />;
}

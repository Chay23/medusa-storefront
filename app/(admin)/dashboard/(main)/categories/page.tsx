import Categories from '@/components/dashboard/product-categories/list/Categories';
import Error from '@/components/dashboard/UI/error/Error';
import { getCategories } from '@/lib/dashboard/data/categories';

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page({ searchParams }: Props) {
	const { page, q } = await searchParams;
	const _page = parseInt(page || '1');
	const categoriesRes = await getCategories(_page, {
		q: q || '',
	});

	if (!categoriesRes.success) {
		return <Error error={categoriesRes.error} />;
	}

	return <Categories categoriesRes={categoriesRes.data} />;
}

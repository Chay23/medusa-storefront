import Collections from '@/components/dashboard/collections/list/Collections';
import Error from '@/components/dashboard/UI/error/Error';
import { getCollections } from '@/lib/dashboard/data/collections';

type Props = {
	searchParams: { [key: string]: string | undefined };
};

export default async function Page({ searchParams }: Props) {
	const { page } = await searchParams;
	const _page = parseInt(page || '1');

	const collectionsRes = await getCollections(_page, { limit: 12 });

	if (!collectionsRes.success) {
		return <Error error={collectionsRes.error} />;
	}

	return <Collections collectionsRes={collectionsRes.data} />;
}

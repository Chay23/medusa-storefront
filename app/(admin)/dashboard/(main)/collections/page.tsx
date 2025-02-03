import Collections from '@/components/dashboard/collections/list/Collections';
import Error from '@/components/dashboard/UI/error/Error';
import { getCollections } from '@/lib/dashboard/data/collections';

export default async function Page() {
	const collectionsRes = await getCollections(1, { limit: 12 });

	if (!collectionsRes.success) {
		return <Error error={collectionsRes.error} />;
	}

	return <Collections collectionsRes={collectionsRes.data} />;
}

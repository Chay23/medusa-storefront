import Collections from '@/components/dashboard/collections/list/Collections';
import { getCollections } from '@/lib/dashboard/data/collections';

export default async function Page() {
	const collectionsRes = await getCollections(1, { limit: 12 });
	return <Collections collectionsRes={collectionsRes} />;
}

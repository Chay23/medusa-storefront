import Collection from '@/components/dashboard/collections/details/Collection';
import { getCollection } from '@/lib/dashboard/data/collections';
import { getProducts } from '@/lib/dashboard/data/products';

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
	const collectionId = (await params).id;
	const { collection } = await getCollection(collectionId);

	return {
		title: 'Collections: ' + collection.title + ' | Dashboard',
	};
}

export default async function Page({ params }: Props) {
	const collectionId = (await params).id;
	const [collectionRes, productsRes] = await Promise.all([
		getCollection(collectionId),
		getProducts(1, { collection_id: collectionId }),
	]);

	return (
		<Collection
			collection={collectionRes.collection}
			productsRes={productsRes}
		/>
	);
}

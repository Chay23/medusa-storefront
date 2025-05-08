import Collection from '@/components/dashboard/collections/details/Collection';
import ErrorComponent from '@/components/dashboard/UI/error/Error';
import { errorObject_1 } from '@/lib/dashboard/common/error/constants';
import { getCollection } from '@/lib/dashboard/data/collections';
import { getProducts } from '@/lib/dashboard/data/products';

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
	const collectionId = (await params).id;
	const { error, data } = await getCollection(collectionId);

	if (!error)
		return {
			title: 'Collections: ' + data.collection.title + ' | Dashboard',
		};
}

export default async function Page({ params }: Props) {
	const collectionId = (await params).id;

	const [collectionRes, productsRes] = await Promise.all([
		getCollection(collectionId),
		getProducts(1, { collection_id: collectionId }),
	]);

	if (!collectionRes.success || !productsRes.success) {
		return <ErrorComponent error={errorObject_1} />;
	}

	return (
		<Collection
			collection={collectionRes.data.collection}
			productsRes={productsRes.data}
		/>
	);
}

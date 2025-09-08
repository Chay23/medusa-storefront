import { getCollections } from '@/lib/dashboard/data/collections';

import CollectionsTable from './collections-table';
import Error from '../../UI/error/Error';

type Props = {
	searchParams: { [key: string]: string | undefined };
};

export default async function Collections({ searchParams }: Props) {
	const {
		page,
		q,
		order,
		'created_at[$gte]': createdGte,
		'created_at[$lte]': createdLte,
		'updated_at[$gte]': updatedGte,
		'updated_at[$lte]': updatedLte,
	} = searchParams;

	const pageNumber = parseInt(page || '1');

	const collectionsRes = await getCollections(pageNumber, {
		q: q || '',
		...(order && { order }),
		...(createdGte && { 'created_at[$gte]': createdGte }),
		...(createdLte && { 'created_at[$lte]': createdLte }),
		...(updatedGte && { 'created_at[$gte]': updatedGte }),
		...(updatedLte && { 'created_at[$lte]': updatedLte }),
		limit: 12,
	});

	if (!collectionsRes.success) {
		return <Error error={collectionsRes.error} />;
	}

	return (
		<>
			<CollectionsTable
				collectionsRes={collectionsRes.data}
				page={pageNumber}
			/>
		</>
	);
}

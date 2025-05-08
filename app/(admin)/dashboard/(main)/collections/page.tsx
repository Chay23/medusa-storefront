import Collections from '@/components/dashboard/collections/list/Collections';
import Error from '@/components/dashboard/UI/error/Error';
import { getCollections } from '@/lib/dashboard/data/collections';

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page({ searchParams }: Props) {
	const {
		page,
		q,
		order,
		'created_at[$gte]': createdGte,
		'created_at[$lte]': createdLte,
		'updated_at[$gte]': updatedGte,
		'updated_at[$lte]': updatedLte,
	} = await searchParams;

	const _page = parseInt(page || '1');

	const collectionsRes = await getCollections(_page, {
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

	return <Collections collectionsRes={collectionsRes.data} />;
}

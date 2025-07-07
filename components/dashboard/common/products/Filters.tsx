import type { UI } from '@/types/ui';

import { getAllProductTypes } from '@/lib/dashboard/data/product-types';
import { getAllProductTags } from '@/lib/dashboard/data/product-tags';

import Error from '../../UI/error/Error';
import TableFilters from '../filters/TableFilters';

import { DAY_OPTIONS_1, PRODUCT_STATUSES } from '@/lib/dashboard/constants';

export default async function ProductFilters() {
	const [productTypes, prouductTags] = await Promise.all([
		getAllProductTypes(),
		getAllProductTags(),
	]);

	if (!productTypes.success || !prouductTags.success) {
		return <Error error={productTypes.error || prouductTags.error} />;
	}

	const filters: UI.Filter[] = [
		{
			type: 'select',
			key: 'tags',
			label: 'Tag',
			options: prouductTags.data.product_tags.map((pt) => ({
				key: pt.id,
				label: pt.value,
			})),
			selectionMode: 'multiple',
		},
		{
			type: 'select',
			key: 'type_id',
			label: 'Type',
			options: productTypes.data.product_types.map((pt) => ({
				key: pt.id,
				label: pt.value,
			})),
			selectionMode: 'multiple',
		},
		{
			type: 'select',
			key: 'status',
			label: 'Status',
			options: PRODUCT_STATUSES,
			selectionMode: 'multiple',
		},
		{
			type: 'date',
			key: 'created_at',
			label: 'Created',
			dayOptions: DAY_OPTIONS_1,
		},
		{
			type: 'date',
			key: 'updated_at',
			label: 'Updated',
			dayOptions: DAY_OPTIONS_1,
		},
	];

	return <TableFilters filters={filters} includeSearch />;
}

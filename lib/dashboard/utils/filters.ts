import { HttpTypes } from '@medusajs/types';
import { DAY_OPTIONS_1, PRODUCT_STATUSES } from '../constants';
import { UI } from '@/types/ui';

export const getProductFilters = ({
	productTypes,
	productTags,
}: {
	productTypes: HttpTypes.AdminProductType[];
	productTags: HttpTypes.AdminProductTag[];
}): UI.Filter[] => [
	{
		type: 'select',
		key: 'tags',
		label: 'Tag',
		options: productTags.map((pt) => ({
			key: pt.id,
			label: pt.value,
		})),
		selectionMode: 'multiple',
	},
	{
		type: 'select',
		key: 'type_id',
		label: 'Type',
		options: productTypes.map((pt) => ({
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

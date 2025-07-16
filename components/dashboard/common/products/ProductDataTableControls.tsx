import type { UI } from '@/types/ui';

import { getAllProductTypes } from '@/lib/dashboard/data/product-types';
import { getAllProductTags } from '@/lib/dashboard/data/product-tags';

import Error from '../../UI/error/Error';
import DataTableControls from '../data-table-controls/DataTableControls';

import { getProductFilters } from '@/lib/dashboard/utils/filters';

type Props = {
	invalidFilterParams: string[];
};

export default async function ProductDataTableControls({
	invalidFilterParams,
}: Props) {
	const [productTypes, productTags] = await Promise.all([
		getAllProductTypes(),
		getAllProductTags(),
	]);

	if (!productTypes.success || !productTags.success) {
		return <Error error={productTypes.error || productTags.error} />;
	}

	const filters = getProductFilters({
		productTypes: productTypes.data.product_types,
		productTags: productTags.data.product_tags,
	});

	return (
		<DataTableControls
			filters={filters}
			includeSearch
			invalidParams={invalidFilterParams}
		/>
	);
}

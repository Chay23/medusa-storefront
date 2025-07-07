import { getCategory } from '@/lib/dashboard/data/categories';

import Error from '../../UI/error/Error';
import CategoryBreadcrumbs from './CategoryBreadcrumbs';
import CategoryDetails from './CategoryDetails';

type Props = {
	id: string;
};

export default async function Category({ id }: Props) {
	const { data, success, error } = await getCategory(id);

	if (!success) {
		return <Error error={error} />;
	}

	return (
		<>
			<CategoryBreadcrumbs category={data.product_category} />
			<CategoryDetails category={data.product_category} />
		</>
	);
}

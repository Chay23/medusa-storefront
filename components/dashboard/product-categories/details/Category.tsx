import { getCategory } from '@/lib/dashboard/data/categories';

import CategoryBreadcrumbs from './CategoryBreadcrumbs';
import CategoryGeneral from './general/CategoryGeneral';
import Error from '../../UI/error/Error';
import CategoryEditDrawer from '../edit/CategoryEditDrawer';

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
			<CategoryEditDrawer category={data.product_category} />
			<CategoryBreadcrumbs category={data.product_category} />
			<CategoryGeneral category={data.product_category} />
		</>
	);
}

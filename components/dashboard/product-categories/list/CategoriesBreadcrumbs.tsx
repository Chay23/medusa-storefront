import type { Breadcrumb } from '@/types/common/breadcrumbs';

import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';

import { paths } from '@/config/paths';

const breadcrumbs: Breadcrumb[] = [
	{
		title: 'Categories',
		href: paths.dashboard.categories.getHref(),
	},
];

export default function CategoriesBreadcrumbs() {
	return <Breadcrumbs items={breadcrumbs} />;
}

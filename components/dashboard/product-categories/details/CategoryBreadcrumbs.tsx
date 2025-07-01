'use client';

import { paths } from '@/config/paths';
import { Api } from '@/types/api';
import type { Breadcrumb } from '@/types/common/breadcrumbs';

import { useMemo } from 'react';
import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';

type Props = {
	category: Api.AdminProductCategory;
};

export default function CategoryBreadcrumbs({ category }: Props) {
	const breadcrumbs: Breadcrumb[] = useMemo(
		() => [
			{
				title: 'Categories',
				href: paths.dashboard.categories.getHref(),
			},
			{
				title: category.name,
				href: paths.dashboard.category.getHref(category.id),
			},
		],
		[]
	);

	return <Breadcrumbs items={breadcrumbs} />;
}

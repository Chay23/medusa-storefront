'use client';

import { paths } from '@/config/paths';
import { Breadcrumb } from '@/types/common/breadcrumbs';

import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';

const breadcrumbs: Breadcrumb[] = [
	{
		title: 'Collections',
		href: paths.dashboard.collections.getHref(),
	},
];

export default function CollectionsBreadcrumbs() {
	return <Breadcrumbs items={breadcrumbs} />;
}

'use client';

import type { AdminProductCategoryListResponse } from '@/types/api/product-categories';
import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';
import { Breadcrumb } from '@/types/common/breadcrumbs';
import { paths } from '@/config/paths';
import { Button } from '@heroui/react';
import CategoriesTable from './Table';

type Props = {
	categoriesRes: AdminProductCategoryListResponse;
};

const breadcrumbs: Breadcrumb[] = [
	{
		title: 'Categories',
		href: paths.dashboard.categories.getHref(),
	},
];

export default function Categories({ categoriesRes }: Props) {
	return (
		<>
			<Breadcrumbs items={breadcrumbs} />
			<section className='content-container'>
				<div className='flex justify-between mb-7'>
					<h2>Categories</h2>
					<Button color='primary'>Create Category</Button>
				</div>
				<CategoriesTable categoriesRes={categoriesRes} />
			</section>
		</>
	);
}

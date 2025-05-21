'use client';

import type { AdminProductCategoryListResponse } from '@/types/api/product-categories';

import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';
import { Breadcrumb } from '@/types/common/breadcrumbs';
import { Button } from '@heroui/react';
import CategoriesTable from './Table';
import CategoriesFilters from './Filters';

import { paths } from '@/config/paths';

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
				<CategoriesFilters />
				<CategoriesTable categoriesRes={categoriesRes} />
			</section>
		</>
	);
}

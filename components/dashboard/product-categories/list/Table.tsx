'use client';

import { useCallback, useState } from 'react';

import Link from 'next/link';

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/table';

import { paths } from '@/config/paths';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { ID_CATEGORY_DELETE } from '@/lib/dashboard/constants';
import { useModals } from '@/store/dashboard/modals';
import { Api } from '@/types/api';
import type { AdminProductCategoryListResponse } from '@/types/api/product-categories';

import StatusBadge from '../../UI/common/StatusBadge';
import TablePagination from '../../UI/table/TablePagination';
import {
	STATUS_ACTIVE_LABEL,
	STATUS_INACTIVE_LABEL,
	VISIBILITY_INTERNAL_LABEL,
	VISIBILITY_PUBLIC_LABEL,
} from '../constants';
import CategoriesListActions from './categories-list-actions';
import { DeleteProductCategoryModal } from '../delete/delete-product-category.modal';

type Props = {
	categoriesRes: AdminProductCategoryListResponse;
	page: number;
};

export default function CategoriesTable({ categoriesRes, page }: Props) {
	const [selectedCategory, setSelectedCategory] =
		useState<null | Api.AdminProductCategory>(null);
	const openModal = useModals((state) => state.openModal);
	const { updateParams } = useUpdateParams();

	const { offset, limit, count, product_categories } = categoriesRes;

	const handleCategoryDeleteModalOpen = (
		category: Api.AdminProductCategory
	) => {
		setSelectedCategory(category);
		openModal(ID_CATEGORY_DELETE);
	};

	const handlePageChange = useCallback(
		(page: number) => {
			updateParams({ page: page.toString() });
		},
		[updateParams]
	);

	return (
		<>
			{selectedCategory && (
				<DeleteProductCategoryModal category={selectedCategory} />
			)}
			<Table aria-label='Collections table' removeWrapper>
				<TableHeader>
					<TableColumn>Title</TableColumn>
					<TableColumn>Handle</TableColumn>
					<TableColumn>Status</TableColumn>
					<TableColumn>Visibility</TableColumn>
					<TableColumn>
						<></>
					</TableColumn>
				</TableHeader>
				<TableBody emptyContent='No Results Found'>
					{product_categories.map((category) => {
						const status = category.is_active
							? STATUS_ACTIVE_LABEL
							: STATUS_INACTIVE_LABEL;
						const visibility = category.is_internal
							? VISIBILITY_INTERNAL_LABEL
							: VISIBILITY_PUBLIC_LABEL;
						return (
							<TableRow
								key={category.id}
								as={Link}
								href={paths.dashboard.category.getHref(category.id)}
								className='cursor-pointer transition-background duration-300 hover:bg-background border-b border-foreground-100'
							>
								<TableCell>{category.name}</TableCell>
								<TableCell>{category.handle}</TableCell>
								<TableCell>
									<StatusBadge
										color={category.is_active ? 'success' : 'danger'}
									>
										{status}
									</StatusBadge>
								</TableCell>
								<TableCell>
									<StatusBadge
										color={category.is_internal ? 'default' : 'success'}
									>
										{visibility}
									</StatusBadge>
								</TableCell>
								<TableCell>
									<CategoriesListActions
										category={category}
										onDeleteModalOpen={handleCategoryDeleteModalOpen}
									/>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<TablePagination
				count={count}
				limit={limit}
				offset={offset}
				page={page}
				onPageChange={handlePageChange}
			/>
		</>
	);
}

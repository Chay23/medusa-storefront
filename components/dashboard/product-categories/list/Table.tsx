'use client';

import { useCallback } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { paths } from '@/config/paths';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import type { AdminProductCategoryListResponse } from '@/types/api/product-categories';

import StatusBadge from '../../UI/common/StatusBadge';
import TablePagination from '../../UI/table/TablePagination';

type Props = {
	categoriesRes: AdminProductCategoryListResponse;
};

export default function CategoriesTable({ categoriesRes }: Props) {
	const searchParams = useSearchParams();
	const { updateParams } = useUpdateParams();

	const { offset, limit, count, product_categories } = categoriesRes;
	const page = parseInt(searchParams.get('page') || '1');

	const handlePageChange = useCallback((page: number) => {
		updateParams({ page: page.toString() });
	}, [updateParams]);

	return (
		<>
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
						const status = category.is_active ? 'Active' : 'Inactive';
						const visibility = category.is_internal ? 'Internal' : 'Public';
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
									<Dropdown>
										<DropdownTrigger>
											<div className='self-center cursor-pointer'>
												<MoreHorizIcon />
											</div>
										</DropdownTrigger>
										<DropdownMenu aria-label='Categories actions'>
											<DropdownItem
												key='edit'
												startContent={<ModeEditOutlineOutlinedIcon />}
											>
												Edit
											</DropdownItem>
											<DropdownItem
												key='delete'
												startContent={<DeleteOutlineOutlinedIcon />}
											>
												Delete
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
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

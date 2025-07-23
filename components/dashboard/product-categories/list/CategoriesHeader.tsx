'use client';

import Link from 'next/link';

import { Button } from '@heroui/button';

import { paths } from '@/config/paths';

import SectionHeader from '../../UI/common/sections/SectionHeader';

export default function CategoriesHeader() {
	return (
		<SectionHeader
			title='Categories'
			description='Manage your product categories'
			className='mb-5'
			endContent={
				<Button
					color='primary'
					as={Link}
					href={paths.dashboard.createCategory.getHref()}
				>
					Create Category
				</Button>
			}
		/>
	);
}

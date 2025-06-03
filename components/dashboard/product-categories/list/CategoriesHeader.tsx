'use client';

import { Button } from '@heroui/react';
import SectionHeader from '../../UI/common/SectionHeader';
import Link from 'next/link';

import { paths } from '@/config/paths';

export default function CategoriesHeader() {
	return (
		<SectionHeader
			title='Categories'
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

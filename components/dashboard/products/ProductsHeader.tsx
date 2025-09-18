'use client';

import Link from 'next/link';

import { Button } from '@heroui/button';

import { paths } from '@/config/paths';

import SectionHeader from '../UI/common/sections/SectionHeader';

export default function ProductsHeader() {
	return (
		<SectionHeader
			title='Products'
			className='mb-5'
			description='Manage your products'
			endContent={
				<div>
					<Button
						as={Link}
						href={paths.dashboard.createProduct.getHref()}
						color='primary'
					>
						Add Product
					</Button>
				</div>
			}
		/>
	);
}

'use client';

import { Button } from '@heroui/button';
import SectionHeader from '../UI/common/SectionHeader';

export default function ProductsHeader() {
	return (
		<SectionHeader
			title='Products'
			className='mb-5'
			description='Manage your products'
			endContent={
				<div>
					<Button color='primary'>Add Product</Button>
				</div>
			}
		/>
	);
}

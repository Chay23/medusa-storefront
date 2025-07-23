import Link from 'next/link';

import { Button } from '@heroui/button';

import { paths } from '@/config/paths';

import SectionHeader from '../../UI/common/sections/SectionHeader';

export default function CollectionsHeader() {
	return (
		<SectionHeader
			title='Collections'
			description='Manage your collections'
			className='mb-5'
			endContent={
				<Button
					as={Link}
					href={paths.dashboard.createCollection.getHref()}
					color='primary'
				>
					Create Collection
				</Button>
			}
		/>
	);
}

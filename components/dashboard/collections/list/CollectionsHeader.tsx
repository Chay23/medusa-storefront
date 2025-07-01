import { Button } from '@heroui/button';
import SectionHeader from '../../UI/common/SectionHeader';
import Link from 'next/link';

import { paths } from '@/config/paths';

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

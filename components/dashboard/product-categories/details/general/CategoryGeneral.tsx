'use client';

import { Divider } from '@heroui/divider';

import SectionRow from '@/components/dashboard/UI/common/sections/SectionRow';
import type { Api } from '@/types/api';

import CategoryActions from './CategoryActions';
import SectionHeader from '../../../UI/common/sections/SectionHeader';
import StatusBadge from '../../../UI/common/StatusBadge';
import { STATUS_OPTIONS, VISIBILITY_OPTIONS } from '../../constants';

type Props = {
	category: Api.AdminProductCategory;
};

export default function CategoryGeneralSection({ category }: Props) {
	const description = Boolean(category.description)
		? category.description
		: '-';

	return (
		<section className='content-container'>
			<SectionHeader
				className='mb-2'
				title={category.name}
				middleContent={<CategoryChips category={category} />}
				endContent={<CategoryActions />}
			/>
			<Divider />
			<SectionRow title='Description' value={description} includeDivider />
			<SectionRow title='Handle' value={category.handle} />
		</section>
	);
}

function CategoryChips({ category }: Props) {
	return (
		<div className='flex gap-2'>
			<StatusBadge
				wrapped
				color={category.is_active ? 'success' : 'danger'}
			>
				{category.is_active ? STATUS_OPTIONS[0].label : STATUS_OPTIONS[1].label}
			</StatusBadge>
			<StatusBadge
				wrapped
				color={category.is_internal ? 'default' : 'success'}
			>
				{category.is_internal
					? VISIBILITY_OPTIONS[1].label
					: VISIBILITY_OPTIONS[0].label}
			</StatusBadge>
		</div>
	);
}

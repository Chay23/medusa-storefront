'use client';

import { Divider } from '@heroui/divider';

import SectionRow from '@/components/dashboard/UI/common/sections/SectionRow';
import type { Api } from '@/types/api';

import CategoryActions from './CategoryActions';
import SectionHeader from '../../../UI/common/sections/SectionHeader';
import StatusBadge from '../../../UI/common/StatusBadge';
import {
	STATUS_ACTIVE_LABEL,
	STATUS_INACTIVE_LABEL,
	VISIBILITY_INTERNAL_LABEL,
	VISIBILITY_PUBLIC_LABEL,
} from '../../constants';

type Props = {
	category: Api.AdminProductCategory;
};

export default function CategoryGeneralSection({ category }: Props) {
	return (
		<section className='content-container'>
			<SectionHeader
				className='mb-2'
				title={category.name}
				middleContent={<CategoryChips category={category} />}
				endContent={<CategoryActions />}
			/>
			<Divider />
			<SectionRow
				title='Description'
				value={category.description}
				includeDivider
			/>
			<SectionRow title='Handle' value={category.handle} />
		</section>
	);
}

function CategoryChips({ category }: Props) {
	return (
		<div className='flex gap-2'>
			<StatusBadge wrapped color={category.is_active ? 'success' : 'danger'}>
				{category.is_active ? STATUS_ACTIVE_LABEL : STATUS_INACTIVE_LABEL}
			</StatusBadge>
			<StatusBadge wrapped color={category.is_internal ? 'default' : 'success'}>
				{category.is_internal
					? VISIBILITY_INTERNAL_LABEL
					: VISIBILITY_PUBLIC_LABEL}
			</StatusBadge>
		</div>
	);
}

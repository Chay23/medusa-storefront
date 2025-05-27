'use client';

import type { Breadcrumb } from '@/types/common/breadcrumbs';
import type { Inputs, WithNewCategory } from './types';
import type { Api } from '@/types/api';

import { useForm } from 'react-hook-form';
import { useActionState, useEffect, useState } from 'react';
import { createCategory } from '@/lib/dashboard/data/categories';
import { showActionToast } from '@/lib/dashboard/utils';
import { redirect } from 'next/navigation';

import { Form, Tab, Tabs } from '@heroui/react';
import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';
import CategoryForm from './Form';
import NewCategoryRanking from './ranking/NewCategoryRanking';

import { paths } from '@/config/paths';
import { ID_CATEGORY_CREATE } from '@/lib/dashboard/contants';
import { DETAILS_SECTION, RANKING_SECTION } from './constants';

const breadcrumbs: Breadcrumb[] = [
	{
		title: 'Categories',
		href: paths.dashboard.categories.getHref(),
	},
	{
		title: 'Create',
		href: paths.dashboard.createCategory.getHref(),
	},
];

type Props = {
	categories: Api.AdminProductCategory[];
};

export default function CreateCategory({ categories }: Props) {
	const [actionState, formAction, isPending] = useActionState(createCategory, {
		success: false,
		toast: null,
	});
	const { control, trigger, getValues } = useForm<Inputs>();
	const [selectedSection, setSelectedSection] = useState(DETAILS_SECTION);
	const [items, setItems] = useState<WithNewCategory[]>(categories);

	useEffect(() => {
		showActionToast(ID_CATEGORY_CREATE, actionState);

		if (actionState.success) {
			redirect(paths.dashboard.categories.getHref());
		}
	}, [actionState]);

	const handleSectionChange = async (key: string | number) => {
		if (await trigger()) {
			setSelectedSection(key as string);
		}

		if (key === RANKING_SECTION) {
			const title = getValues('name');
			const idx = items.findIndex((item) => item.id === 'new');
			if (idx !== -1) {
				const tempArray = [...items];
				tempArray[idx].name = title;
				setItems(tempArray);
				return;
			}
			const tempArray = [{ id: 'new', name: title, new: true }, ...items];
			setItems(tempArray);
		}
	};

	return (
		<>
			<Breadcrumbs items={breadcrumbs} />
			<div className='content-container'>
				<Form action={formAction} className='w-full'>
					<Tabs
						className='w-full'
						selectedKey={selectedSection}
						onSelectionChange={handleSectionChange}
						destroyInactiveTabPanel={false}
					>
						<Tab
							key={DETAILS_SECTION}
							title='Details'
							className='w-full flex justify-center'
						>
							<CategoryForm
								control={control}
								onSectionChange={handleSectionChange}
							/>
						</Tab>
						<Tab
							key={RANKING_SECTION}
							title='Organize Ranking'
							className='w-full flex justify-center'
						>
							<NewCategoryRanking
								items={items}
								isPending={isPending}
								setItems={setItems}
							/>
						</Tab>
					</Tabs>
				</Form>
			</div>
		</>
	);
}

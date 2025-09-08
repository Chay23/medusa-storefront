'use client';

import { useActionState, useEffect } from 'react';

import { redirect } from 'next/navigation';

import { Form } from '@heroui/form';
import { Button, Input } from '@heroui/react';

import { paths } from '@/config/paths';
import { createCollection } from '@/lib/dashboard/data/collections';
import { showActionToast } from '@/lib/dashboard/utils';
import type { Breadcrumb } from '@/types/common/breadcrumbs';

import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';

const breadcrumbs: Breadcrumb[] = [
	{
		title: 'Collections',
		href: paths.dashboard.collections.getHref(),
	},
	{
		title: 'Create',
		href: paths.dashboard.createCollection.getHref(),
	},
];

export default function CollectionCreate() {
	const [actionState, formAction, isPending] = useActionState(
		createCollection,
		{
			success: false,
			errors: {},
			toast: null,
		}
	);

	useEffect(() => {
		showActionToast('collection-create', actionState);

		if (actionState.success) {
			redirect(paths.dashboard.collections.getHref());
		}
	}, [isPending, actionState]);

	return (
		<>
			<Breadcrumbs items={breadcrumbs} />
			<div className='content-container flex justify-center'>
				<Form action={formAction} className='w-full max-w-[720px]'>
					<div className='w-full flex justify-between'>
						<div>
							<h3 className='mb-2'>Create Collection</h3>
							<p className='text-text-secondary'>
								Create a new collection to organize your products.
							</p>
						</div>
						<Button type='submit' color='primary'>
							Create
						</Button>
					</div>
					<div className='w-full flex gap-8 mt-8'>
						<div className='flex-1 flex flex-col gap-1'>
							<Input
								name='title'
								labelPlacement='outside'
								label='Title'
								placeholder='Collection Title'
							/>
							<div className='text-danger-400 text-xs'>
								{actionState.errors.title ?? ''}
							</div>
						</div>
						<Input
							name='handle'
							labelPlacement='outside'
							label='Handle'
							placeholder='Collection Handle'
							startContent={'/'}
							className='flex-1'
						/>
					</div>
				</Form>
			</div>
		</>
	);
}

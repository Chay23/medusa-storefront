'use client';

import { createCollection } from '@/lib/dashboard/data/collections';
import { Button, Input } from '@heroui/react';
import { Form } from '@heroui/form';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { redirect } from 'next/navigation';
import Breadcrumbs from '../../UI/breadcrumbs/Breadcrumbs';
import { Breadcrumb } from '@/types/common/breadcrumbs';

const breadcrumbs: Breadcrumb[] = [
	{
		title: 'Collections',
		href: '/dashboard/collections',
	},
	{
		title: 'Create',
		href: '/dashboard/collections/create',
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
		if (actionState.toast) {
			toast[`${actionState.success ? 'success' : 'error'}`](
				actionState.toast.message,
				{
					id: 'collection-create',
				}
			);
		}

		if (actionState.success) {
			redirect('/dashboard/collections');
		}
	}, [isPending]);

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

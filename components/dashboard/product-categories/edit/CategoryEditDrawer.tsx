'use client';

import { useActionState, useEffect, useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { DrawerContent, DrawerFooter, DrawerHeader } from '@heroui/drawer';
import { Form } from '@heroui/form';
import { useForm } from 'react-hook-form';

import { useShallowUpdateParams } from '@/hooks/useShallowUpdateParams';
import { ID_CATEGORY_EDIT } from '@/lib/dashboard/constants';
import { editCategory } from '@/lib/dashboard/data/categories';
import { showActionToast } from '@/lib/dashboard/utils';
import { useDrawers } from '@/store/dashboard/drawers';
import type { Api } from '@/types/api';

import CategoryGeneralEditForm from './Form';
import {
	STATUS_ACTIVE_KEY,
	STATUS_INACTIVE_KEY,
	VISIBILITY_INTERNAL_KEY,
	VISIBILITY_PUBLIC_KEY,
} from '../constants';
import { EditDrawerInputs } from './types';
import Drawer from '../../common/drawer/Drawer';

type Props = {
	category: Api.AdminProductCategory;
};

export default function CategoryEditDrawer({ category }: Props) {
	const searchParams = useSearchParams();
	const { shallowUpdateParams } = useShallowUpdateParams();
	const showDrawer = searchParams.get('edit') === 'true' ? true : false;
	const openDrawer = useDrawers((state) => state.openDrawer);
	const closeDrawer = useDrawers((state) => state.closeDrawer);

	const boundEditCategory = useMemo(
		() => editCategory.bind(null, category.id),
		[category]
	);

	const [actionState, formAction, isPending] = useActionState(
		boundEditCategory,
		{
			success: false,
			toast: null,
		}
	);

	const { control, reset, watch } = useForm<EditDrawerInputs>({
		mode: 'onChange',
	});

	useEffect(() => {
		showActionToast(ID_CATEGORY_EDIT, actionState);
		if (actionState.success) {
			closeDrawer(ID_CATEGORY_EDIT);
		}
	}, [actionState, closeDrawer]);

	useEffect(() => {
		if (showDrawer) {
			openDrawer(ID_CATEGORY_EDIT);
		}
	}, [showDrawer, openDrawer]);

	useEffect(() => {
		reset({
			name: category.name,
			handle: category.handle,
			description: category.description,
			is_active: category.is_active ? STATUS_ACTIVE_KEY : STATUS_INACTIVE_KEY,
			is_internal: category.is_internal
				? VISIBILITY_INTERNAL_KEY
				: VISIBILITY_PUBLIC_KEY,
		});
	}, [category, reset]);

	const handleClose = () => {
		if (showDrawer) {
			shallowUpdateParams({ edit: null });
		}
		closeDrawer(ID_CATEGORY_EDIT);
		reset();
	};

	return (
		<Drawer id={ID_CATEGORY_EDIT} onClose={handleClose}>
			<Form action={formAction}>
				<DrawerContent>
					<EditDrawerHeader />
					<CategoryGeneralEditForm
						control={control}
						watch={watch}
						reset={reset}
					/>
					<EditDrawerFooter onClose={handleClose} isPending={isPending} />
				</DrawerContent>
			</Form>
		</Drawer>
	);
}

function EditDrawerHeader() {
	return (
		<DrawerHeader className='flex-col'>
			<h4 className='mb-2 font-normal'>Edit collection</h4>
			<Divider />
		</DrawerHeader>
	);
}

type FooterProps = {
	onClose: () => void;
	isPending: boolean;
};

function EditDrawerFooter({ onClose, isPending }: FooterProps) {
	return (
		<DrawerFooter className='flex-col gap-3'>
			<Divider />
			<div className='flex justify-end gap-2'>
				<Button onPress={onClose}>Cancel</Button>
				<Button type='submit' color='primary' isLoading={isPending}>
					Save
				</Button>
			</div>
		</DrawerFooter>
	);
}

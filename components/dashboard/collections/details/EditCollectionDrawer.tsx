'use client';

import { useActionState, useEffect, useMemo } from 'react';

import {
	Button,
	Divider,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	Form,
	Input,
} from '@heroui/react';
import { Controller, useForm } from 'react-hook-form';

import { useShallowUpdateParams } from '@/hooks/useShallowUpdateParams';
import { ID_COLLECTION_EDIT } from '@/lib/dashboard/constants';
import { updateCollection } from '@/lib/dashboard/data/collections';
import { showActionToast } from '@/lib/dashboard/utils';
import { useDrawers } from '@/store/dashboard/drawers';
import type { AdminCollection } from '@/types/api/collections';

import Drawer from '../../common/drawer/Drawer';

type Props = {
	collection: AdminCollection;
};

type Inputs = {
	title: string;
	handle: string;
};

export default function EditCollectionDrawer({ collection }: Props) {
	const closeDrawer = useDrawers((state) => state.closeDrawer);
	const { shallowUpdateParams } = useShallowUpdateParams();
	const boundUpdateCollection = useMemo(
		() => updateCollection.bind(null, { id: collection.id }),
		[collection.id]
	);

	const [actionState, formAction, isPending] = useActionState(
		boundUpdateCollection,
		{
			success: false,
			toast: null,
		}
	);
	const {
		control,
		formState: { isValid },
		reset,
	} = useForm<Inputs>({
		mode: 'onChange',
		defaultValues: {
			title: collection.title,
			handle: collection.handle,
		},
	});

	useEffect(() => {
		showActionToast(ID_COLLECTION_EDIT, actionState);

		if (actionState.success) {
			closeDrawer(ID_COLLECTION_EDIT);
		}
	}, [actionState]);

	const handleDrawerClose = () => {
		closeDrawer(ID_COLLECTION_EDIT);
		reset();
		shallowUpdateParams({ edit: null });
	};

	return (
		<Drawer id={ID_COLLECTION_EDIT} onClose={handleDrawerClose}>
			<Form action={formAction}>
				<DrawerContent>
					<DrawerHeader className='flex-col'>
						<h5 className='mb-2'>Edit collection</h5>
						<Divider />
					</DrawerHeader>
					<DrawerBody>
						<Controller
							control={control}
							name='title'
							rules={{ required: 'Title can not be empty' }}
							render={({
								field: { name, value, onChange },
								fieldState: { invalid, error },
							}) => (
								<Input
									label='Title'
									labelPlacement='outside'
									name={name}
									isInvalid={invalid}
									errorMessage={error?.message}
									value={value}
									onChange={onChange}
								/>
							)}
						/>
						<Controller
							control={control}
							name='handle'
							rules={{ required: 'Handle can not be empty' }}
							render={({
								field: { name, value, onChange },
								fieldState: { invalid, error },
							}) => (
								<Input
									label='Handle'
									labelPlacement='outside'
									startContent='/'
									name={name}
									isInvalid={invalid}
									errorMessage={error?.message}
									value={value}
									onChange={onChange}
								/>
							)}
						/>
					</DrawerBody>
					<DrawerFooter className='flex-col'>
						<Divider className='mb-1' />
						<div className='self-end flex gap-2'>
							<Button type='button' onPress={handleDrawerClose}>
								Cancel
							</Button>
							<Button
								type='submit'
								color='primary'
								isLoading={isPending}
								isDisabled={!isValid}
							>
								Save
							</Button>
						</div>
					</DrawerFooter>
				</DrawerContent>
			</Form>
		</Drawer>
	);
}

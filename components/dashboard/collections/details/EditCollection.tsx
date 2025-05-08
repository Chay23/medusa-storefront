'use client';

import type { AdminCollection } from '@/types/api/collections';
import {
	Button,
	Divider,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	Form,
	Input,
} from '@heroui/react';
import { useActionState, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { updateCollection } from '@/lib/dashboard/data/collections';
import { useShallowUpdateParams } from '@/hooks/useShallowUpdateParams';

type Props = {
	collection: AdminCollection;
	openDrawer: boolean;
	onToggleDrawer: () => void;
};

type Inputs = {
	title: string;
	handle: string;
};

export default function EditCollection({
	collection,
	openDrawer,
	onToggleDrawer,
}: Props) {
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
		if (!actionState.toast) {
			return;
		}
		toast[`${actionState.success ? 'success' : 'error'}`](
			actionState.toast.message,
			{
				id: 'collection-edit',
			}
		);

		onToggleDrawer();
	}, [actionState]);

	const handleDrawerClose = () => {
		onToggleDrawer();
		reset();
		shallowUpdateParams({ edit: null });
	};

	return (
		<Drawer isOpen={openDrawer} onClose={handleDrawerClose}>
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

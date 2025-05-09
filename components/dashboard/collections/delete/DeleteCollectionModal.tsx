import type { AdminCollection } from '@/types/api/collections';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useMemo } from 'react';
import { deleteCollection } from '@/lib/dashboard/data/collections';

import {
	Button,
	Form,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@heroui/react';

type Props = {
	openModal: boolean;
	onModalClose: () => void;
	collection: AdminCollection;
	revalidateList?: boolean;
};

export default function DeleteCollectionModal({
	openModal,
	onModalClose,
	collection,
	revalidateList,
}: Props) {
	const router = useRouter();
	const boundDeleteCollection = useMemo(
		() =>
			deleteCollection.bind(null, {
				id: collection.id,
			}),
		[collection.id]
	);

	const [actionState, formAction, isPending] = useActionState(
		boundDeleteCollection,
		{
			success: false,
			toast: null,
		}
	);

	useEffect(() => {
		if (actionState.toast) {
			toast[`${actionState.success ? 'success' : 'error'}`](
				actionState.toast.message,
				{
					id: 'collection-delete',
				}
			);
		}

		if (actionState.success) {
			onModalClose();
			revalidateList ? router.refresh() : router.push('/dashboard/collections');
		}
	}, [actionState]);

	return (
		<Modal isOpen={openModal} onClose={onModalClose}>
			<ModalContent>
				<ModalHeader>Delete collection</ModalHeader>
				<ModalBody>
					<div>
						Are you sure you want to delete&nbsp;
						<span className='font-semibold'>{collection.title}</span>?
					</div>
				</ModalBody>
				<ModalFooter>
					<Form action={formAction} className='flex flex-row'>
						<Button onPress={onModalClose}>Cancel</Button>
						<Button color='danger' type='submit' isLoading={isPending}>
							Delete
						</Button>
					</Form>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

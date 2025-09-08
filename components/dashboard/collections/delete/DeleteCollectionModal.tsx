import { useActionState, useEffect, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import {
	Button,
	Form,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@heroui/react';

import { paths } from '@/config/paths';
import { ID_COLLECTION_DELETE } from '@/lib/dashboard/constants';
import { deleteCollection } from '@/lib/dashboard/data/collections';
import { showActionToast } from '@/lib/dashboard/utils';
import { useModals } from '@/store/dashboard/modals';
import type { AdminCollection } from '@/types/api/collections';

import Modal from '../../common/modal/Modal';

type Props = {
	collection: AdminCollection;
	redirectToList?: boolean;
};

export default function DeleteCollectionModal({
	collection,
	redirectToList,
}: Props) {
	const closeDeleteModal = useModals((state) => state.closeModal);
	const router = useRouter();
	const boundDeleteCollection = useMemo(
		() => deleteCollection.bind(null, collection.id),
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
		showActionToast(ID_COLLECTION_DELETE, actionState);

		if (actionState.success) {
			closeDeleteModal(ID_COLLECTION_DELETE);
			if (redirectToList) {
				router.push(paths.dashboard.collections.getHref());
			}
		}
	}, [actionState, redirectToList, router, closeDeleteModal]);

	return (
		<Modal id={ID_COLLECTION_DELETE}>
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
						<Button onPress={() => closeDeleteModal(ID_COLLECTION_DELETE)}>
							Cancel
						</Button>
						<Button color='danger' type='submit' isLoading={isPending}>
							Delete
						</Button>
					</Form>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

import type { AdminCollection } from '@/types/api/collections';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useMemo } from 'react';
import { deleteCollection } from '@/lib/dashboard/data/collections';
import { showActionToast } from '@/lib/dashboard/utils';
import { useModals } from '@/store/dashboard/modals';

import {
	Button,
	Form,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@heroui/react';
import Modal from '../../common/modal/Modal';

import { ID_COLLECTION_DELETE } from '@/lib/dashboard/contants';
import { paths } from '@/config/paths';

type Props = {
	collection: AdminCollection;
	revalidateList?: boolean;
};

export default function DeleteCollectionModal({
	collection,
	revalidateList,
}: Props) {
	const onClose = useModals((state) => state.closeModal);
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
		showActionToast(ID_COLLECTION_DELETE, actionState);

		if (actionState.success) {
			onClose(ID_COLLECTION_DELETE);
			revalidateList ? router.refresh() : router.push(paths.dashboard.collections.getHref());
		}
	}, [actionState]);

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
						<Button onPress={() => onClose(ID_COLLECTION_DELETE)}>
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

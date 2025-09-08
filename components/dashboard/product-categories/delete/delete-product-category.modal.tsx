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
import { ID_CATEGORY_DELETE } from '@/lib/dashboard/constants';
import { deleteCategory } from '@/lib/dashboard/data/categories';
import { showActionToast } from '@/lib/dashboard/utils';
import { useModals } from '@/store/dashboard/modals';
import { Api } from '@/types/api';

import Modal from '../../common/modal/Modal';

type Props = {
	category: Api.AdminProductCategory;
	redirectToList?: boolean;
};

export function DeleteProductCategoryModal({
	category,
	redirectToList,
}: Props) {
	const closeDeleteModal = useModals((state) => state.closeModal);
	const router = useRouter();

	const boundDeleteCategory = useMemo(
		() => deleteCategory.bind(null, category.id),
		[category.id]
	);

	const [actionState, formAction, isPending] = useActionState(
		boundDeleteCategory,
		{
			success: false,
			toast: null,
		}
	);

	useEffect(() => {
		showActionToast(ID_CATEGORY_DELETE, actionState);

		if (actionState.success) {
			closeDeleteModal(ID_CATEGORY_DELETE);

			if (redirectToList) {
				router.push(paths.dashboard.categories.getHref());
			}
		}
	}, [actionState, redirectToList, closeDeleteModal, router]);

	return (
		<Modal id={ID_CATEGORY_DELETE}>
			<ModalContent>
				<ModalHeader>Delete category</ModalHeader>
				<ModalBody>
					<div>
						Are you sure you want to delete&nbsp;
						<span className='font-semibold'>{category.name}</span>?
					</div>
				</ModalBody>
				<ModalFooter>
					<Form action={formAction} className='flex flex-row'>
						<Button onPress={() => closeDeleteModal(ID_CATEGORY_DELETE)}>
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

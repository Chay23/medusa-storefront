import type { ReactNode } from 'react';

import { useModals } from '@/store/dashboard/modals';
import { Modal as ModalWrapper } from '@heroui/react';

type Props = {
	id: string;
	children: ReactNode;
};
export default function Modal({ id, children }: Props) {
	const modal = useModals((state) => state.modals[id]);
	const onClose = useModals((state) => state.closeModal);

	const handleModalClose = (id: string) => {
		return () => onClose(id);
	};

	if (!modal) {
		return null;
	}

	return (
		<ModalWrapper isOpen={modal.isOpen} onClose={handleModalClose(id)}>
			{children}
		</ModalWrapper>
	);
}

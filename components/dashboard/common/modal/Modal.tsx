import type { ReactNode } from 'react';

import { useModals } from '@/store/dashboard/modals';
import { Modal as ModalWrapper } from '@heroui/react';

type Props = {
	id: string;
	children: ReactNode;
};
export default function Modal({ id, children }: Props) {
	const modals = useModals((state) => state.modals);
	const onClose = useModals((state) => state.closeModal);

	const handleModalClose = (id: string) => {
		return () => onClose(id);
	};

	if (!modals[id]) {
		return null;
	}

	return (
		<ModalWrapper isOpen={modals[id].isOpen} onClose={handleModalClose(id)}>
			{children}
		</ModalWrapper>
	);
}

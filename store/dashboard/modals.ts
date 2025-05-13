import type { ModalStore } from '@/types/store/modals';
import { create } from 'zustand';

export const useModals = create<ModalStore>((set) => ({
	modals: {},
	openModal: (id: string) =>
		set(() => ({ modals: { [id]: { isOpen: true } } })),
	closeModal: (id: string) =>
		set(() => ({ modals: { [id]: { isOpen: false } } })),
}));

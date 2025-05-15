import type { ModalsStore } from '@/types/store/modals';
import { create } from 'zustand';

export const useModals = create<ModalsStore>((set) => ({
	modals: {},
	openModal: (id: string) =>
		set(() => ({ modals: { [id]: { isOpen: true } } })),
	closeModal: (id: string) =>
		set(() => ({ modals: { [id]: { isOpen: false } } })),
}));

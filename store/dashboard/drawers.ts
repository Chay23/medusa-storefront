import type { DrawersStore } from '@/types/store/drawers';
import { create } from 'zustand';

export const useDrawers = create<DrawersStore>((set) => ({
	drawers: {},
	openDrawer: (id: string) =>
		set(() => ({ drawers: { [id]: { isOpen: true } } })),
	closeDrawer: (id: string) =>
		set(() => ({ drawers: { [id]: { isOpen: false } } })),
}));

export type Drawer = {
	isOpen: boolean;
};

export type DrawersStore = {
	drawers: { [key: string]: Drawer };
	openDrawer: (id: string) => void;
	closeDrawer: (id: string) => void;
};

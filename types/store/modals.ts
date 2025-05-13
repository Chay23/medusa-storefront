export type Modal = {
	isOpen: boolean;
};

export type ModalStore = {
	modals: { [key: string]: Modal };
	openModal: (id: string) => void;
	closeModal: (id: string) => void;
};

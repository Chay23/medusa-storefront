import { DrawerProps, Drawer as DrawerWrapper } from '@heroui/react';

import { useDrawers } from '@/store/dashboard/drawers';

type Props = DrawerProps & {
	id: string;
};

export default function Drawer({ id, children, onClose, ...props }: Props) {
	const drawer = useDrawers((state) => state.drawers[id]);

	if (!drawer) {
		return null;
	}

	return (
		<DrawerWrapper isOpen={drawer.isOpen} onClose={onClose} {...props}>
			{children}
		</DrawerWrapper>
	);
}

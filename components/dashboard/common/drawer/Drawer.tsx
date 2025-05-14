import type { ReactNode } from 'react';

import { useDrawers } from '@/store/dashboard/drawers';
import { Drawer as DrawerWrapper } from '@heroui/react';

type Props = {
	id: string;
	children: ReactNode;
	onBeforeClose?: () => void;
};

export default function Drawer({ id, children, onBeforeClose }: Props) {
	const drawer = useDrawers((state) => state.drawers[id]);
	const onDrawerClose = useDrawers((state) => state.closeDrawer);

	const handleDrawerClose = (id: string) => {
		return () => {
			if (onBeforeClose) {
				onBeforeClose();
			}
			onDrawerClose(id);
		};
	};

	if (!drawer) {
		return null;
	}

	return (
		<DrawerWrapper isOpen={drawer.isOpen} onClose={handleDrawerClose(id)}>
			{children}
		</DrawerWrapper>
	);
}

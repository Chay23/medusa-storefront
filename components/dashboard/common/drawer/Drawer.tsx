import dynamic from 'next/dynamic';

import { DrawerProps } from '@heroui/drawer';

import { useDrawers } from '@/store/dashboard/drawers';

const DrawerWrapper = dynamic(
	() => import('@heroui/drawer').then((mod) => mod.Drawer),
	{
		ssr: false,
	}
);

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

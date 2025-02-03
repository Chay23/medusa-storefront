import type { ReactNode } from 'react';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import { Divider } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems: (
	| { type: 'divider' }
	| { type: 'item'; key: string; label: string; icon: ReactNode }
)[] = [
	{
		type: 'item',
		key: '/dashboard',
		label: 'Dashboard',
		icon: <HomeOutlinedIcon />,
	},
	{
		type: 'item',
		key: '/dashboard/products',
		label: 'Products',
		icon: <Inventory2OutlinedIcon />,
	},
	{
		type: 'item',
		key: '/dashboard/collections',
		label: 'Collections',
		icon: <FeaturedPlayListIcon />,
	},
	{
		type: 'item',
		key: '/dashboard/categories',
		label: 'Catregories',
		icon: <CategoryOutlinedIcon />,
	},

	{
		type: 'item',
		key: '/dashboard/orders',
		label: 'Orders',
		icon: <LocalMallOutlinedIcon />,
	},
	{
		type: 'item',
		key: '/dashboard/users',
		label: 'Users',
		icon: <GroupOutlinedIcon />,
	},
	{ type: 'divider' },
	{
		type: 'item',
		key: '/dashboard/settings',
		label: 'Settings',
		icon: <SettingsOutlinedIcon />,
	},
];

const isActive = (link: string, currPath: string) => {
	if (link === '/dashboard') {
		return link === currPath;
	}
	return currPath.startsWith(link);
};

export default function Navigation({}) {
	const pathname = usePathname();

	return (
		<div className='flex flex-col gap-1'>
			{sidebarItems.map((item, idx) =>
				item.type === 'divider' ? (
					<Divider key={idx} />
				) : (
					<Link
						key={item.key}
						href={item.key}
						className={`flex gap-5 items-center p-2 rounded-lg transition-all ease-in-out duration-300 hover:bg-primary-100 hover:text-primary ${
							isActive(item.key, pathname) ? 'bg-primary-100 text-primary' : ''
						}`}
					>
						<div>{item.icon}</div>
						<div>{item.label}</div>
					</Link>
				)
			)}
		</div>
	);
}

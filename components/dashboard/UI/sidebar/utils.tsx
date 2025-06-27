import type { ReactNode } from 'react';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

import { paths } from '@/config/paths';

export const sidebarItems: (
	| { type: 'divider' }
	| { type: 'item'; key: string; label: string; icon: ReactNode }
)[] = [
	{
		type: 'item',
		key: paths.dashboard.root.getHref(),
		label: 'Dashboard',
		icon: <HomeOutlinedIcon />,
	},
	{
		type: 'item',
		key: paths.dashboard.products.getHref(),
		label: 'Products',
		icon: <Inventory2OutlinedIcon />,
	},
	{
		type: 'item',
		key: paths.dashboard.collections.getHref(),
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

export const isActive = (link: string, currPath: string) => {
	if (link === '/dashboard') {
		return link === currPath;
	}
	return currPath.startsWith(link);
};

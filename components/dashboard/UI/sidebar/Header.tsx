import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	User,
} from '@heroui/react';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { signOut } from '@/lib/dashboard/data/user';

export default function Header() {
	return (
		<div className='flex flex-col gap-4'>
			<h4>Storefront</h4>
			<Dropdown placement='bottom-end'>
				<DropdownTrigger>
					<User
						avatarProps={{
							icon: <PersonOutlineOutlinedIcon />,
						}}
						name='Nazar Shcherbii'
						className='border p-2 w-full justify-start cursor-pointer'
					></User>
				</DropdownTrigger>
				<DropdownMenu>
					<DropdownItem startContent={<SettingsIcon />} key='profile-settings'>
						Settings
					</DropdownItem>
					<DropdownItem
						startContent={<LogoutIcon />}
						key='logout'
						onPress={() => signOut()}
					>
						Logout
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}

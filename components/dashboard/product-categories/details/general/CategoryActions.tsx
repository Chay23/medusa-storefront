import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/dropdown';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { ID_CATEGORY_EDIT } from '@/lib/dashboard/constants';
import { useDrawers } from '@/store/dashboard/drawers';

export default function CategoryActions() {
	const openDrawer = useDrawers((state) => state.openDrawer);

	const handleOpenDrawer = () => {
		openDrawer(ID_CATEGORY_EDIT);
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<div className='self-center cursor-pointer'>
					<MoreHorizIcon />
				</div>
			</DropdownTrigger>
			<DropdownMenu aria-label='Product category actions'>
				<DropdownItem
					key='edit'
					startContent={<ModeEditOutlineOutlinedIcon />}
					onPress={handleOpenDrawer}
				>
					Edit
				</DropdownItem>
				<DropdownItem key='delete' startContent={<DeleteOutlineOutlinedIcon />}>
					Delete
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}

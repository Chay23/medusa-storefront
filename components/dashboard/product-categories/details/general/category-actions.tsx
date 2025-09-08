import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/dropdown';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {
	ID_CATEGORY_DELETE,
	ID_CATEGORY_EDIT,
} from '@/lib/dashboard/constants';
import { useDrawers } from '@/store/dashboard/drawers';
import { useModals } from '@/store/dashboard/modals';

export default function CategoryActions() {
	const openDrawer = useDrawers((state) => state.openDrawer);
	const openModal = useModals((state) => state.openModal);

	const handleDeleteModalOpen = () => {
		openModal(ID_CATEGORY_DELETE);
	};

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
				<DropdownItem
					key='delete'
					startContent={<DeleteOutlineOutlinedIcon />}
					onPress={handleDeleteModalOpen}
				>
					Delete
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}

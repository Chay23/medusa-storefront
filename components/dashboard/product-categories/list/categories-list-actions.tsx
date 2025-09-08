import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/dropdown';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { paths } from '@/config/paths';
import { Api } from '@/types/api';

type Props = {
	category: Api.AdminProductCategory;
	onDeleteModalOpen: (category: Api.AdminProductCategory) => void;
};

export default function CategoriesListActions({
	category,
	onDeleteModalOpen,
}: Props) {
	return (
		<Dropdown>
			<DropdownTrigger>
				<div className='self-center cursor-pointer'>
					<MoreHorizIcon />
				</div>
			</DropdownTrigger>
			<DropdownMenu aria-label='Categories actions'>
				<DropdownItem
					href={paths.dashboard.category.getHref(category.id) + '?edit=true'}
					key='edit'
					startContent={<ModeEditOutlineOutlinedIcon />}
				>
					Edit
				</DropdownItem>
				<DropdownItem
					key='delete'
					startContent={<DeleteOutlineOutlinedIcon />}
					onPress={() => onDeleteModalOpen(category)}
				>
					Delete
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}

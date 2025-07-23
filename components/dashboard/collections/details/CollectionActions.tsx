import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/dropdown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {
	ID_COLLECTION_DELETE,
	ID_COLLECTION_EDIT,
} from '@/lib/dashboard/constants';

type Props = {
	onEditDrawerOpen: (id: string) => void;
	onDeleteModalOpen: (id: string) => void;
};

export default function CollectionActions({
	onEditDrawerOpen,
	onDeleteModalOpen,
}: Props) {
	return (
		<Dropdown>
			<DropdownTrigger>
				<div className='self-center cursor-pointer'>
					<MoreHorizIcon />
				</div>
			</DropdownTrigger>
			<DropdownMenu aria-label='Collection actions'>
				<DropdownItem
					key='edit'
					onPress={() => onEditDrawerOpen(ID_COLLECTION_EDIT)}
				>
					Edit
				</DropdownItem>
				<DropdownItem
					key='delete'
					onPress={() => onDeleteModalOpen(ID_COLLECTION_DELETE)}
				>
					Delete
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}

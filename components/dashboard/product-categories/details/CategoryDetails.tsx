'use client';

import { Api } from '@/types/api';

import SectionHeader from '../../UI/common/SectionHeader';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/react';

type Props = {
	category: Api.AdminProductCategory;
};

export default function CategoryDetails({ category }: Props) {
	return (
		<section className='content-container'>
			<SectionHeader
				className='mb-2'
				title={category.name}
				endContent={
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
							>
								Edit
							</DropdownItem>
							<DropdownItem
								key='delete'
								startContent={<DeleteOutlineOutlinedIcon />}
							>
								Delete
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				}
			/>
			<div className='flex'>
				<div className='flex-1'>Handle</div>
				<div className='text-foreground-500 flex-1'>/{category.handle}</div>
			</div>
		</section>
	);
}

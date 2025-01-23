import { Input, Select, SelectItem } from '@heroui/react';
import SearchIcon from '@mui/icons-material/Search';

export default function Filters({}) {
	return (
		<div className='flex gap-4 justify-between items-center mb-4'>
			<div className='flex gap-3'>
				<Select label='Filter' className='min-w-[200px]'>
					<SelectItem>Item</SelectItem>
				</Select>
				<Select label='Filter' className='min-w-[200px]'>
					<SelectItem>Item</SelectItem>
				</Select>
			</div>
			<Input
				startContent={<SearchIcon />}
				className='border rounded-xl w-fit'
				placeholder='Search'
			/>
		</div>
	);
}

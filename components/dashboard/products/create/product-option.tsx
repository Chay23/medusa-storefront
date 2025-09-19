import { Button } from '@heroui/button';
import ClearIcon from '@mui/icons-material/Clear';
import { Controller, useFormContext } from 'react-hook-form';

import ChipInput from '../../common/forms/ChipInput';
import ControlledInput from '../../common/forms/ControlledInput';

type Props = {
	index: number;
	onDeleteVariantOption: () => void;
};

export default function ProductVariantOption({
	index,
	onDeleteVariantOption,
}: Props) {
	const { control } = useFormContext();
	const notDeleteable = index === 0;
	return (
		<li>
			<div className='flex bg-surface-secondary px-4 py-2 rounded-xl'>
				<div className='grid grid-cols-[min-content,1fr] items-center gap-2 flex-1'>
					<p className=''>Title</p>
					<ControlledInput
						control={control}
						name={`options.${index}.title`}
						placeholder='Size'
					/>
					<p className=''>Values</p>
					<Controller
						control={control}
						name={`options.${index}.values`}
						render={({ field: { onChange, value, ...field } }) => {
							const handleValueChange = (value: string[]) => {
								onChange(value);
							};
							return (
								<ChipInput
									{...field}
									items={value}
									onChange={handleValueChange}
									allowDuplicates={false}
									placeholder={'XS, S, M'}
								/>
							);
						}}
					></Controller>
				</div>
				<div className='flex items-center pl-4'>
					<Button
						isDisabled={notDeleteable}
						isIconOnly
						onPress={onDeleteVariantOption}
					>
						<ClearIcon />
					</Button>
				</div>
			</div>
		</li>
	);
}

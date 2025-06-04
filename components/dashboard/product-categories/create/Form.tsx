import { Button, Input, Select, SelectItem, Textarea } from '@heroui/react';
import { Control, Controller } from 'react-hook-form';
import { Inputs } from './types';
import { RANKING_SECTION, statusOptions, visibilityOptions } from './constants';

type Props = {
	control: Control<Inputs, any, Inputs>;
	isItemsLoading: boolean;
	onSectionChange: (key: string | number) => Promise<void>;
};

export default function CategoryForm({
	control,
	isItemsLoading,
	onSectionChange,
}: Props) {
	return (
		<div className='max-w-[720px] grow'>
			<div className='w-full flex justify-between'>
				<div>
					<h3 className='mb-2'>Create Category</h3>
					<p className='text-text-secondary'>
						Create a new category to organize your products.
					</p>
				</div>
			</div>
			<div className='w-full flex flex-col gap-8 mt-3'>
				<div className='flex flex-row gap-8'>
					<Controller
						control={control}
						name='name'
						rules={{ required: 'Name can not be empty' }}
						render={({
							field: { name, value, onChange },
							fieldState: { invalid, error },
						}) => (
							<Input
								label='Name'
								labelPlacement='outside'
								name={name}
								isInvalid={invalid}
								errorMessage={error?.message}
								value={value}
								onChange={onChange}
							/>
						)}
					/>
					<Controller
						control={control}
						name='handle'
						render={({ field: { name, value, onChange } }) => (
							<Input
								label='Handle'
								labelPlacement='outside'
								startContent={'/'}
								name={name}
								value={value}
								onChange={onChange}
							/>
						)}
					/>
				</div>
				<Controller
					control={control}
					name='description'
					render={({ field: { name, value, onChange } }) => (
						<Textarea
							label='Description'
							labelPlacement='outside'
							name={name}
							value={value}
							onChange={onChange}
						/>
					)}
				/>
				<div className='flex gap-5'>
					<Controller
						control={control}
						name='is_active'
						render={({ field: { name, value, onChange } }) => (
							<Select
								label='Status'
								labelPlacement='outside'
								name={name}
								value={value}
								onChange={onChange}
								defaultSelectedKeys={[value]}
								disallowEmptySelection
							>
								{statusOptions.map((option) => (
									<SelectItem key={option.key}>{option.label}</SelectItem>
								))}
							</Select>
						)}
					/>
					<Controller
						control={control}
						name='is_internal'
						render={({ field: { name, value, onChange } }) => (
							<Select
								label='Visibility'
								labelPlacement='outside'
								name={name}
								value={value}
								onChange={onChange}
								defaultSelectedKeys={[value]}
								disallowEmptySelection
							>
								{visibilityOptions.map((option) => (
									<SelectItem key={option.key}>{option.label}</SelectItem>
								))}
							</Select>
						)}
					/>
				</div>
				<div className='flex justify-end'>
					<Button
						color='primary'
						isLoading={isItemsLoading}
						onPress={() => onSectionChange(RANKING_SECTION)}
					>
						Continue
					</Button>
				</div>
			</div>
		</div>
	);
}

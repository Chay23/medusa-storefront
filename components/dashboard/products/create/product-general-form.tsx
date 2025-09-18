'use client';

import { Control } from 'react-hook-form';

import ControlledInput from '../../common/forms/ControlledInput';
import ControlledTextarea from '../../common/forms/ControlledTextarea';
import { CreateProductInputs } from '../types';

type Props = {
	control: Control<CreateProductInputs>;
};

export default function ProductGeneralForm({ control }: Props) {
	return (
		<div className='flex flex-col gap-6'>
			<div className='w-full flex justify-between'>
				<div>
					<h3 className='mb-2'>Create Product</h3>
					<p className='text-text-secondary'>
						Create a new category to organize your products.
					</p>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<ControlledInput
					name='title'
					control={control}
					rules={{
						validate: (value) => (value as string)?.trim() !== '',
						required: 'Name can not be empty',
					}}
					label='Title'
					placeholder='Gym t-shirt'
				/>
				<ControlledInput
					name='subtitle'
					control={control}
					rules={{
						validate: (value) => (value as string)?.trim() !== '',
						required: 'Name can not be empty',
					}}
					label='Subtitle'
					placeholder='Sturdy and ...'
				/>
				<ControlledInput
					name='handle'
					control={control}
					rules={{
						validate: (value) => (value as string)?.trim() !== '',
						required: 'Name can not be empty',
					}}
					label={
						<span>
							Handle{' '}
							<span className='text-xs text-text-secondary'>
								(auto-generated)
							</span>
						</span>
					}
					placeholder='/gym-t-shirt'
				/>
			</div>
			<ControlledTextarea
				name='description'
				control={control}
				rules={{
					validate: (value) => (value as string)?.trim() !== '',
					required: 'Name can not be empty',
				}}
				label='Description'
				placeholder='The best gym t-shirt...'
			/>
		</div>
	);
}

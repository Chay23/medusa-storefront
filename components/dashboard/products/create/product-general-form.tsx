'use client';

import Link from 'next/link';

import { Button } from '@heroui/react';
import { useFormContext } from 'react-hook-form';

import { paths } from '@/config/paths';

import ControlledInput from '../../common/forms/ControlledInput';
import ControlledTextarea from '../../common/forms/ControlledTextarea';
import { PRODUCT_TAB_2_KEY } from '../constants';

type Props = {
	onTabChange: (key: string | number) => void;
};

export default function ProductGeneralForm({ onTabChange }: Props) {
	const { control } = useFormContext();
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
						required: 'Title can not be empty',
					}}
					label='Title'
					placeholder='Gym t-shirt'
				/>
				<ControlledInput
					name='subtitle'
					control={control}
					label='Subtitle'
					placeholder='Sturdy and ...'
				/>
				<ControlledInput
					name='handle'
					control={control}
					label={
						<span>
							Handle&nbsp;
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
				label='Description'
				placeholder='The best gym t-shirt...'
			/>
			<div className='flex justify-end gap-2'>
				<Button as={Link} href={paths.dashboard.products.getHref()}>
					Cancel
				</Button>
				<Button color='primary' onPress={() => onTabChange(PRODUCT_TAB_2_KEY)}>
					Continue
				</Button>
			</div>
		</div>
	);
}

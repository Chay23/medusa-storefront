'use client';

import { DrawerBody } from '@heroui/drawer';
import { SelectItem } from '@heroui/select';
import { Control, UseFormReset, UseFormWatch } from 'react-hook-form';

import ControlledInput from '../../common/forms/ControlledInput';
import ControlledSelect from '../../common/forms/ControlledSelect';
import ControlledTextarea from '../../common/forms/ControlledTextarea';
import { STATUS_OPTIONS, VISIBILITY_OPTIONS } from '../constants';
import { EditDrawerInputs } from './types';
import Dot from '../../UI/common/Dot';

type Props = {
	control: Control<EditDrawerInputs>;
	watch: UseFormWatch<EditDrawerInputs>;
	reset: UseFormReset<EditDrawerInputs>;
};

export default function CategoryEditForm({ control, watch }: Props) {
	return (
		<DrawerBody className='flex flex-col gap-4'>
			<ControlledInput
				name='name'
				control={control}
				rules={{
					validate: (value) => value.trim() !== '',
					required: 'Name can not be empty',
				}}
				label='Name'
			/>
			<ControlledInput
				name='handle'
				control={control}
				label='Handle'
				startContent={<span>/</span>}
			/>
			<ControlledTextarea
				name='description'
				control={control}
				label='Description'
			/>
			<div className='w-full flex gap-4'>
				<ControlledSelect
					name='is_active'
					control={control}
					label='Status'
					startContent={
						<Dot
							color={watch('is_active') === 'active' ? 'success' : 'danger'}
						/>
					}
					options={STATUS_OPTIONS}
					className='max-w-full'
					disallowEmptySelection
				>
					{STATUS_OPTIONS.map((option) => (
						<SelectItem
							key={option.key}
							startContent={
								<Dot color={option.key === 'active' ? 'success' : 'danger'} />
							}
						>
							{option.label}
						</SelectItem>
					))}
				</ControlledSelect>
				<ControlledSelect
					name='is_internal'
					control={control}
					label='Visibility'
					startContent={
						<Dot
							color={
								watch('is_internal') === 'internal' ? 'default' : 'success'
							}
						/>
					}
					options={VISIBILITY_OPTIONS}
					className='max-w-full'
					disallowEmptySelection
				>
					{VISIBILITY_OPTIONS.map((option) => (
						<SelectItem
							key={option.key}
							startContent={
								<Dot
									color={option.key === 'internal' ? 'default' : 'success'}
								/>
							}
						>
							{option.label}
						</SelectItem>
					))}
				</ControlledSelect>
			</div>
		</DrawerBody>
	);
}

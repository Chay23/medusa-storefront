'use client';

import { Tab, Tabs } from '@heroui/react';
import { useForm } from 'react-hook-form';

import ProductGeneralForm from './product-general-form';
import {
	DEFAULT_FORM_VALUES,
	PRODUCT_TAB_1_KEY,
	PRODUCT_TAB_1_TITLE,
} from '../constants';
import { CreateProductInputs } from '../types';

export default function CreateProductForm() {
	const { control } = useForm<CreateProductInputs>({
		mode: 'onChange',
		defaultValues: DEFAULT_FORM_VALUES,
	});

	return (
		<div className='content-container'>
			<Tabs>
				<Tab key={PRODUCT_TAB_1_KEY} title={PRODUCT_TAB_1_TITLE}>
					<ProductGeneralForm control={control} />
				</Tab>
			</Tabs>
		</div>
	);
}

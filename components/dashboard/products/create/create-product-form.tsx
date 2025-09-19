'use client';

import { useState } from 'react';

import { Form, Tab, Tabs } from '@heroui/react';
import { FormProvider, useForm } from 'react-hook-form';

import ProductGeneralForm from './product-general-form';
import {
	DEFAULT_FORM_VALUES,
	PRODUCT_TAB_1_KEY,
	PRODUCT_TAB_1_TITLE,
	PRODUCT_TAB_2_KEY,
	PRODUCT_TAB_2_TITLE,
} from '../constants';
import { CreateProductInputs } from '../types';
import ProductVariantOptionsForm from './product-options-form';

export default function CreateProductForm() {
	const methods = useForm<CreateProductInputs>({
		mode: 'onChange',
		defaultValues: DEFAULT_FORM_VALUES,
	});

	const [selectedTab, setSelectedTab] = useState(PRODUCT_TAB_1_KEY);

	const handleTabChange = async (key: string | number) => {
		if (await methods.trigger()) {
			setSelectedTab(key as string);
		}
	};

	return (
		<div className='content-container'>
			<FormProvider {...methods}>
				<Form className='max-w-[720px] m-auto'>
					<Tabs
						selectedKey={selectedTab}
						onSelectionChange={handleTabChange}
						destroyInactiveTabPanel={false}
					>
						<Tab
							key={PRODUCT_TAB_1_KEY}
							title={PRODUCT_TAB_1_TITLE}
							className='w-full'
						>
							<ProductGeneralForm onTabChange={handleTabChange} />
						</Tab>
						<Tab key={PRODUCT_TAB_2_KEY} title={PRODUCT_TAB_2_TITLE}>
							<ProductVariantOptionsForm />
						</Tab>
					</Tabs>
				</Form>
			</FormProvider>
		</div>
	);
}

import { CreateProductInputs } from './types';

export const DEFAULT_VARIANT_OPTION = {
	title: 'Default Option',
	values: ['Default Options Value'],
};
export const NEW_VARIANT_OPTION = { title: '', values: [] };

export const DEFAULT_FORM_VALUES: CreateProductInputs = {
	title: '',
	subtitle: '',
	handle: '',
	description: '',
	options: [DEFAULT_VARIANT_OPTION],
};

export const PRODUCT_TAB_1_KEY = 'product-details';
export const PRODUCT_TAB_1_TITLE = 'Details';

export const PRODUCT_TAB_2_KEY = 'product-variants';
export const PRODUCT_TAB_2_TITLE = 'Variants';

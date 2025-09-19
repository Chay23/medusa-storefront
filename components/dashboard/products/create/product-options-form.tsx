import { useState } from 'react';

import Link from 'next/link';

import { Button, cn, Switch } from '@heroui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { paths } from '@/config/paths';

import ProductVariantOption from './product-option';
import { DEFAULT_VARIANT_OPTION, NEW_VARIANT_OPTION } from '../constants';
import { CreateProductInputs } from '../types';

export default function ProductVariantOptionsForm() {
	const { control } = useFormContext<CreateProductInputs>();

	const {
		fields: productVariantOptions,
		append,
		remove,
	} = useFieldArray<CreateProductInputs, 'options'>({
		control,
		name: 'options',
	});

	const [showVariants, setShowVariants] = useState(false);

	const handleShowVariantsToggle = () => {
		setShowVariants((prevValue: boolean) => !prevValue);

		if (!showVariants) {
			remove();
			append(NEW_VARIANT_OPTION);
			return;
		}

		remove();
		append(DEFAULT_VARIANT_OPTION);
	};

	const handleAddVariantOption = () => {
		append(NEW_VARIANT_OPTION);
	};

	const handleDeleteVariantOption = (index: number) => {
		if (productVariantOptions.length <= 1) {
			return;
		}
		remove(index);
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-2'>
				<Switch
					onChange={handleShowVariantsToggle}
					classNames={{
						base: cn('flex-row-reverse items-center justify-start gap-2'),
						label: cn('m-0'),
					}}
				>
					<h3>Variants</h3>
				</Switch>
				<p className='text-text-secondary'>
					Create product variants by adding options. When unchecked, we will
					create default variant for you
				</p>
			</div>
			{showVariants && (
				<>
					<div className='items-center'>
						<h5>Product options</h5>
						<div className='flex items-center justify-between'>
							<p className='text-text-secondary'>
								Define the options for product, e.g. color, size, etc.
							</p>
							<Button color='primary' onPress={handleAddVariantOption}>
								Add Option
							</Button>
						</div>
					</div>
					<ul className='flex flex-col gap-4'>
						{productVariantOptions.map((option, index) => (
							<ProductVariantOption
								key={option.id}
								index={index}
								onDeleteVariantOption={() => handleDeleteVariantOption(index)}
							/>
						))}
					</ul>
				</>
			)}
			<div className='flex justify-end gap-2'>
				<Button as={Link} href={paths.dashboard.products.getHref()}>
					Cancel
				</Button>
				<Button>Continue</Button>
			</div>
		</div>
	);
}

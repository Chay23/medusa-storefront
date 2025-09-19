import {
	KeyboardEvent,
	RefCallback,
	RefObject,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';

import { Chip } from '@heroui/chip';
import { Input } from '@heroui/react';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
	items: string[];
	allowDuplicates?: boolean;
	placeholder?: string;
	onChange: (chips: string[]) => void;
	onBlur?: () => void;
	ref?: RefObject<HTMLInputElement | null> | RefCallback<HTMLInputElement>;
};

export default function ChipInput({
	items,
	onChange,
	onBlur,
	allowDuplicates = false,
	placeholder,
	ref,
}: Props) {
	const innerRef = useRef<HTMLInputElement>(null);
	const [contorlledValue, setControlledValue] = useState('');

	useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
		ref,
		() => innerRef.current
	);

	const handleAddChip = (chip: string) => {
		const cleanValue = chip.trim();

		if (!cleanValue) {
			return;
		}

		if (!allowDuplicates && items.includes(cleanValue)) {
			items.indexOf(cleanValue);

			return;
		}

		onChange?.([...items, cleanValue]);
	};

	const handleBlur = () => {
		onBlur?.();

		if (contorlledValue) {
			handleAddChip(contorlledValue);
			setControlledValue('');
		}
	};

	const handleRemoveChip = (chip: string) => {
		onChange?.(items.filter((v) => v !== chip));
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();

			if (!contorlledValue) {
				return;
			}

			handleAddChip(contorlledValue);
			setControlledValue('');
			innerRef.current?.focus();
		}

		if (e.key === 'Backspace') {
			handleRemoveChip(items[items.length - 1]);
		}
	};

	return (
		<Input
			startContent={
				<InputChips items={items} onChipRemove={handleRemoveChip} />
			}
			classNames={{
				input: '!ps-0',
			}}
			value={contorlledValue}
			onKeyDown={handleKeyDown}
			onBlur={handleBlur}
			onValueChange={setControlledValue}
			baseRef={innerRef}
			autoComplete='off'
			placeholder={placeholder}
		/>
	);
}

type InputChipsProps = {
	items: string[];
	onChipRemove: (chip: string) => void;
};

function InputChips({ items, onChipRemove }: InputChipsProps) {
	return (
		<div className={`flex gap-1 ${items.length > 0 ? 'pe-2' : ''}`}>
			{items.map((item) => (
				<Chip
					key={item}
					endContent={
						<button
							className='cursor-pointer'
							onClick={() => onChipRemove(item)}
						>
							<ClearIcon className='max-w-3 max-h-3 mr-1' />
						</button>
					}
				>
					{item}
				</Chip>
			))}
		</div>
	);
}

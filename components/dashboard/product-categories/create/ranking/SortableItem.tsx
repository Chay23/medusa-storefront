import type { WithNewCategory } from '../types';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandle } from '@mui/icons-material';

type Props = {
	item: WithNewCategory;
};

export default function SortableItem({ item }: Props) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: item.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const isNewItem = item.id === 'new';
	const attachedAttrs = isNewItem ? attributes : {};
	const attachedListeners = isNewItem ? listeners : {};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`flex gap-4 border border-neutral-00 rounded-md px-4 py-3 mb-1 ${
				isNewItem ? 'bg-' : 'bg-default-100'
			}`}
		>
			<DragHandle {...attachedAttrs} {...attachedListeners} />
			{item.name}
			{isNewItem && (
				<div className='bg-primary rounded-md p-1 text-xs text-primary-200'>
					New
				</div>
			)}
		</div>
	);
}

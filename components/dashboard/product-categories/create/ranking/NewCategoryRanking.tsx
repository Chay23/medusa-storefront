import type { DragEndEvent } from '@dnd-kit/core';
import type { WithNewCategory } from '../types';

import { Dispatch, SetStateAction, useMemo } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import Sortable from '../../../common/sortable/Sortable';
import { Button } from '@heroui/react';
import SortableItem from './SortableItem';

type Props = {
	items: WithNewCategory[];
	isPending: boolean;
	setItems: Dispatch<SetStateAction<WithNewCategory[]>>;
};

export default function NewCategoryRanking({
	items,
	isPending,
	setItems,
}: Props) {
	const rank = useMemo(
		() => items.findIndex((item) => item.id === 'new'),
		[items]
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) {
			return;
		}

		if (active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	return (
		<>
			<input hidden name='rank' value={rank} readOnly/>
			<div className='max-w-[720px] grow h-full overflow-auto'>
				<Sortable
					items={items}
					onDragEnd={handleDragEnd}
					renderItem={(item) => <SortableItem key={item.id} item={item} />}
				/>
				<div className='flex justify-end mt-2'>
					<Button color='primary' type='submit' isLoading={isPending}>
						Create
					</Button>
				</div>
			</div>
		</>
	);
}

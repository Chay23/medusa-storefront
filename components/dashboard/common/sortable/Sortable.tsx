import type { ReactNode } from 'react';
import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type WithId = {
	id: string | number;
};

type Props<T extends WithId> = {
	items: T[];
	onDragEnd: (e: DragEndEvent) => void;
	renderItem: (item: T) => ReactNode;
};

export default function Sortable<T extends WithId>({
	items,
	onDragEnd,
	renderItem,
}: Props<T>) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
		<DndContext sensors={sensors} onDragEnd={onDragEnd}>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{items.map((item) => renderItem(item))}
			</SortableContext>
		</DndContext>
	);
}

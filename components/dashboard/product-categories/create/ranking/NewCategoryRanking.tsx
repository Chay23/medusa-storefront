import type { DragEndEvent } from '@dnd-kit/core';
import type { WithNewCategory } from '../types';

import {
	Dispatch,
	SetStateAction,
	use,
	useCallback,
	useEffect,
	useMemo,
} from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import Sortable from '../../../common/sortable/Sortable';
import { Button } from '@heroui/react';
import SortableItem from './SortableItem';
import Error from '@/components/dashboard/UI/error/Error';
import { RetrieveResponse } from '@/types/common/fetch';
import { Api } from '@/types/api';

type Props = {
	items: WithNewCategory[];
	isPending: boolean;
	setItems: Dispatch<SetStateAction<WithNewCategory[]>>;
	categoriesPromise: Promise<
		RetrieveResponse<Api.AdminProductCategoryListResponse>
	>;
};

export default function NewCategoryRanking({
	items,
	isPending,
	setItems,
	categoriesPromise,
}: Props) {
	const categoriesRes = use(categoriesPromise);

	if (!categoriesRes.success) {
		return <Error error={categoriesRes.error} />;
	}

	const rank = useMemo(
		() => items.findIndex((item) => item.id === 'new'),
		[items]
	);

	useEffect(() => {
		setItems(categoriesRes.data.product_categories);
	}, []);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
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
		},
		[items]
	);

	if (!items) {
		return null;
	}

	return (
		<>
			<input hidden name='rank' value={rank} readOnly />
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

import { Pagination } from '@heroui/react';
import ResultsCount from './ResultsCount';
import { memo } from 'react';

type Props = {
	page: number;
	limit: number;
	offset: number;
	count: number;
	onPageChange: (page: number) => void;
};

export default memo(function TablePagination({
	limit,
	count,
	offset,
	page,
	onPageChange,
}: Props) {
	return (
		<div className='flex justify-between mt-6'>
			<ResultsCount limit={limit} offset={offset} count={count} />
			<Pagination
				showControls
				page={page}
				total={Math.ceil(count / limit)}
				onChange={onPageChange}
			/>
		</div>
	);
});

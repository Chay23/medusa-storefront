import { Api } from '@/types/api';

type Props = Api.PaginationFields & {
	classNames?: string;
};

export default function ResultsCount({
	limit,
	offset,
	count,
	classNames,
}: Props) {
	const resultsStart = offset + 1;
	const resultsEnd = offset + limit > count ? count : offset + limit;
	return (
		<div className={classNames}>
			Results: {resultsStart} - {resultsEnd} of {count}
		</div>
	);
}

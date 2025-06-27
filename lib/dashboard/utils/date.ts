import { getLocalTimeZone, parseDate } from '@internationalized/date';

export const formatFiltersDate = (dateStr: string) => {
	const date = parseDate(dateStr);
	const jsDate = date.toDate(getLocalTimeZone());
	const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
		jsDate
	);
	return `${month} ${date.day}, ${date.year}`;
};

export const getListDateString = (date: string) => {
	return date
		? new Date(date).toLocaleDateString('en-US', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
		  })
		: '-';
};

import { getLocalTimeZone, parseDate } from '@internationalized/date';

export const formatDate = (dateStr: string) => {
	const date = parseDate(dateStr);
	const jsDate = date.toDate(getLocalTimeZone());
	const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
		jsDate
	);
	return `${month} ${date.day}, ${date.year}`;
};

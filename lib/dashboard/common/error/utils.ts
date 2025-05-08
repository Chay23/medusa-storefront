import { errorMessage_1 } from './constants';

export const getRetrieveError = (url: string) => {
	return errorMessage_1 + ' ' + url;
};

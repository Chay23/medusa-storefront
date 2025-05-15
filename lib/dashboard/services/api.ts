import type { Api } from '@/types/api';
import type { RetrieveResponse } from '@/types/common/fetch';

import { getAdminURL } from '@/utils/env';
import { getAuthHeader } from '../data/cookies';
import { errorObject_1 } from '../common/error/constants';
import { getRetrieveError } from '../common/error/utils';

export const getPaginationOffset = (limitParam: number, pageParam: number) => {
	const page = Math.max(pageParam, 1);
	const offset = (page - 1) * limitParam;
	return offset;
};

export const getPaginatedList = async <
	T,
	Q extends Api.FindParams & Api.SearchParams = Api.FindParams &
		Api.SearchParams
>(
	page: number,
	limit: number,
	path: string,
	queryParams?: Q
): Promise<RetrieveResponse<T>> => {
	const offset = getPaginationOffset(limit, page);
	const adminURL = getAdminURL();

	const headers = {
		...(await getAuthHeader()),
	};

	const _queryParams = new URLSearchParams({
		...(queryParams && { ...queryParams }),
		limit: limit.toString(),
		offset: offset.toString(),
	}).toString();

	const url = `${adminURL}${path}?${_queryParams}`;

	try {
		const res = await fetch(url, {
			headers,
		});

		if (!res.ok) {
			throw new Error(getRetrieveError(url));
		}

		const list = (await res.json()) as T;

		return {
			success: true,
			error: null,
			data: list,
		};
	} catch (e) {
		console.error(e);

		return {
			success: false,
			error: errorObject_1,
			data: null,
		};
	}
};

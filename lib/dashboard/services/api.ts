import type { Api } from '@/types/api';
import type { RetrieveResponse } from '@/types/common/fetch';

import { getAdminURL } from '@/utils/env';
import { getAuthHeader } from '../data/cookies';
import { FETCH_ERROR_OBJECT_1 } from '../common/error/constants';
import ResponseError from '@/lib/errors/ResponseError';

export const handleFetch = async <T>(
	url: string,
	args: RequestInit
): Promise<RetrieveResponse<T>> => {
	try {
		const res = await fetch(url, args);
		const responseData = (await res.json()) as T;

		if (!res.ok) {
			const error = new ResponseError(
				(responseData as Api.ErrorResponse).message ||
					'An unknown error occurred'
			);
			throw error;
		}

		return {
			success: true,
			error: null,
			data: responseData,
		};
	} catch (e) {
		console.error(e);

		if (e instanceof ResponseError) {
			return {
				success: false,
				error: e,
				data: null,
			};
		}

		return {
			success: false,
			error: FETCH_ERROR_OBJECT_1,
			data: null,
		};
	}
};

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

	return await handleFetch<T>(url, { headers });
};

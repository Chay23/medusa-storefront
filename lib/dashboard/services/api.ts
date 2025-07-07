import type { Api } from '@/types/api';
import type { RetrieveResponse } from '@/types/common/fetch';
import type { PaginationFields } from '@/types/api/common';

import { API_URL, FETCH_ERROR_OBJECT_1 } from '@/lib/dashboard/constants';
import { getAuthHeader } from '../data/cookies';
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

export const handleActionFetch = async (
	url: string,
	args: RequestInit,
	successMessage: string
) => {
	try {
		const res = await fetch(url, args);

		if (!res.ok) {
			const json = await res.json();
			throw new ResponseError(json.message);
		}

		return {
			success: true,
			toast: { message: successMessage },
		};
	} catch (e) {
		console.error(e);

		if (e instanceof ResponseError) {
			return {
				success: false,
				toast: { message: e.message },
			};
		}
		return {
			success: false,
			toast: { message: 'An unknown error occured' },
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

	const headers = {
		...(await getAuthHeader()),
	};

	const _queryParams = new URLSearchParams({
		...(queryParams && { ...queryParams }),
		limit: limit.toString(),
		offset: offset.toString(),
	}).toString();

	const url = `${API_URL}${path}?${_queryParams}`;

	return await handleFetch<T>(url, { headers });
};

export const getFullList = async <
	T,
	Q extends Api.FindParams & Api.SearchParams = Api.FindParams &
		Api.SearchParams
>(
	path: string,
	queryParams?: Q
): Promise<RetrieveResponse<T>> => {
	let offset = 0;
	const limit = 9999;

	const headers = {
		...(await getAuthHeader()),
	};

	const _queryParams = new URLSearchParams({
		...(queryParams && { ...queryParams }),
		limit: limit.toString(),
		offset: offset.toString(),
	});

	let url = `${API_URL}${path}?${_queryParams.toString()}`;
	let res = await handleFetch<T>(url, { headers });

	if (!res.success) {
		return res;
	}

	if ((res.data as PaginationFields).count <= limit) {
		return res;
	}

	_queryParams.set('limit', (res.data as PaginationFields).count.toString());

	url = `${API_URL}${path}?${_queryParams.toString()}`;
	return await handleFetch<T>(url, { headers });
};

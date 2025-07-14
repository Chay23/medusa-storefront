import { parseJSON } from './common';

export const transformQueryParams = <T extends object>(
	params: T,
	options: { arr?: string[]; obj?: string[] }
) => {
	const result = {} as Record<string, unknown>;

	for (const key in params) {
		if (options.obj && options.obj.includes(key)) {
			const paramObj = parseJSON(params[key] as string);

			if (!paramObj) {
				continue;
			}
			result[key] = paramObj;
			continue;
		}
		if (options.arr && options.arr.includes(key)) {
			const paramArray = (params[key] as string).split(',');
			result[key] = paramArray;
			continue;
		}
		result[key] = params[key];
	}

	return result;
};

// Validating query parameters for:
// - empty param values: 'type_id=' -> invalid
// - invalid param objects: 'created_at={"$gte"' -> invalid
export const validateQueryParams = <T extends object>(
	params: T,
	options: { obj: string[] }
) => {
	const validParams = {} as Record<string, unknown>;
	const invalidParams = [];

	for (const key in params) {
		if (!params[key]) {
			invalidParams.push(key);
			continue;
		}
		if (options && options.obj.includes(key)) {
			const paramObj = parseJSON(params[key] as string);

			if (!paramObj) {
				invalidParams.push(key);
				continue;
			}
		}
		validParams[key] = params[key];
	}

	return { validParams, invalidParams };
};

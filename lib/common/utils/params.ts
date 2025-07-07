export const transformQueryParams = <T extends object>(
	params: T,
	options: { arr?: string[]; obj?: string[] }
) => {
	const result = {} as Record<string, unknown>;

	for (const key in params) {
		if (options.obj && options.obj.includes(key)) {
			const dateObj = JSON.parse(params[key] as string);
			result[key] = dateObj;
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

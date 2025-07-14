export const parseJSON = (param: string) => {
	try {
		return JSON.parse(param);
	} catch (e) {
		console.error('Failed to parse JSON:', { input: param, e });
		return undefined;
	}
};

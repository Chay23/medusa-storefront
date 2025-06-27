export const mockFetch = (ok: boolean, response: Record<string, unknown>) => {
	global.fetch = jest.fn().mockResolvedValue({
		ok,
		json: async () => response,
	});
};

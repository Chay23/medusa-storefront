export const getAdminData = async (
	url: string,
	query: Record<string, string>,
	requestData: RequestInit
) => {
	const res = fetch(`${process.env.API_BASE_URL}${url}`, {});
};

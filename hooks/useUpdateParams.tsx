import { useRouter, useSearchParams } from 'next/navigation';

export function useUpdateParams() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const updateParams = (updates: Record<string, string | null>) => {
		const params = new URLSearchParams(searchParams);
		Object.entries(updates).forEach(([key, value]) =>
			value ? params.set(key, value) : params.delete(key)
		);
		router.replace(`?${params}`);
	};

	return {
		updateParams,
	};
}

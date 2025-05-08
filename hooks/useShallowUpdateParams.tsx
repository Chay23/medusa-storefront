import { useSearchParams } from 'next/navigation';

export function useShallowUpdateParams() {
	const searchParams = useSearchParams();

	const shallowUpdateParams = (updates: Record<string, string | null>) => {
		const params = new URLSearchParams(searchParams);
		Object.entries(updates).forEach(([key, value]) =>
			value ? params.set(key, value) : params.delete(key)
		);
		window.history.pushState(null, '', `?${params}`);
	};

	return {
		shallowUpdateParams,
	};
}

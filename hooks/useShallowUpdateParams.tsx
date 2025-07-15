'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useShallowUpdateParams() {
	const searchParams = useSearchParams();

	const shallowUpdateParams = useCallback(
		(updates: Record<string, string | null>) => {
			const params = new URLSearchParams(searchParams);
			Object.entries(updates).forEach(([key, value]) =>
				value ? params.set(key, value) : params.delete(key)
			);
			window.history.pushState(null, '', `?${params}`);
		},
		[searchParams]
	);

	return {
		shallowUpdateParams,
	};
}

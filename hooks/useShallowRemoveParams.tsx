'use client';

import { useEffect } from 'react';
import { useShallowUpdateParams } from './useShallowUpdateParams';

export function useShallowRemoveParams(params: string[]) {
	const { shallowUpdateParams } = useShallowUpdateParams();

	useEffect(() => {
		if (params.length > 0) {
			shallowUpdateParams(
				params.reduce((obj, param) => {
					obj[param] = null;
					return obj;
				}, {} as Record<string, null>)
			);
		}
	}, [shallowUpdateParams]);
}

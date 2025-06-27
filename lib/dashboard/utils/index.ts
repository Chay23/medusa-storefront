import type { ActionState } from '@/types/api/actions/common';

import toast from 'react-hot-toast';

export const showActionToast = (id: string, actionState: ActionState) => {
	if (actionState.toast)
		toast[`${actionState.success ? 'success' : 'error'}`](
			actionState.toast.message,
			{
				id,
			}
		);
};

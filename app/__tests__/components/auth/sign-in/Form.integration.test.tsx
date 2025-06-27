import SignInForm from '@/components/dashboard/sign-in/Form';
import { ActionStateWithValidation } from '@/types/api/actions/common';
import { render, screen, fireEvent, act } from '@testing-library/react';

import {
	TEST_EMAIL,
	TEST_PASSWORD,
	TEST_TOAST_INVALID_AUTH_DATA_MESSAGE,
} from '@/app/__tests__/__lib__/__constants__';

jest.mock('@/lib/dashboard/data/user', () => ({
	signIn: jest.fn(),
}));

jest.mock('@/lib/dashboard/utils', () => ({
	showActionToast: jest.fn(),
}));

const mockSignIn = require('@/lib/dashboard/data/user').signIn as jest.Mock;
const mockShowActionToast = require('@/lib/dashboard/utils')
	.showActionToast as jest.Mock;

describe('SignInForm | Client Component | Integration', () => {
	beforeEach(async () => {
		jest.clearAllMocks();
		render(<SignInForm from={undefined} />);
	});

	it('should call server action on form submit', async () => {
		mockSignIn.mockResolvedValue({
			success: false,
			errors: {},
			toast: null,
		} as ActionStateWithValidation);

		await act(async () => {
			const signinButton = screen.getByRole('button', { name: /sign in/i });
			fireEvent.click(signinButton);
		});

		expect(mockSignIn).toHaveBeenCalled();
	});

	it('should show inputs validation errors on failed server validation', async () => {
		mockSignIn.mockResolvedValue({
			success: false,
			errors: { email: 'Invalid email', password: 'Invalid password' },
			toast: null,
		} as ActionStateWithValidation);

		await act(async () => {
			const signinButton = screen.getByRole('button', { name: /sign in/i });
			fireEvent.click(signinButton);
		});

		expect(screen.getByText('Invalid email')).toBeInTheDocument();
		expect(screen.getByText('Invalid password')).toBeInTheDocument();
	});

	it('should show toast on failed auth server validation', async () => {
		mockSignIn.mockResolvedValue({
			success: false,
			errors: {},
			toast: { message: TEST_TOAST_INVALID_AUTH_DATA_MESSAGE },
		} as ActionStateWithValidation);

		fireEvent.change(screen.getByLabelText('Email'), {
			target: { value: TEST_EMAIL },
		});
		fireEvent.change(screen.getByLabelText('Password'), {
			target: { value: TEST_PASSWORD },
		});

		await act(async () => {
			const signinButton = screen.getByRole('button', { name: /sign in/i });
			fireEvent.click(signinButton);
		});

		expect(mockShowActionToast).toHaveBeenCalled();
	});
});

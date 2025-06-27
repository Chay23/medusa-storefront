import {
	TEST_AUTH_TOKEN_VALUE,
	TEST_EMAIL,
	TEST_PASSWORD,
	TEST_REDIRECT_FROM,
	TEST_TOAST_INVALID_AUTH_DATA_MESSAGE,
} from '@/app/__tests__/__lib__/__constants__';
import { mockFetch } from '@/app/__tests__/__lib__/__utils__';
import { paths } from '@/config/paths';
import {
	VALIDATION_EMPTY_PASSWORD,
	VALIDATION_INVALID_EMAIL,
} from '@/lib/dashboard/constants/validation';
import { setAuthToken } from '@/lib/dashboard/data/cookies';
import { signIn } from '@/lib/dashboard/data/user';
import { ActionStateWithValidation } from '@/types/api/actions/common';
import { redirect } from 'next/navigation';

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
}));

jest.mock('@/lib/dashboard/data/cookies', () => ({
	setAuthToken: jest.fn(),
}));

const getAuthFormData = ({
	email,
	password,
}: {
	email?: string;
	password?: string;
}) => {
	const formData = new FormData();
	formData.set('email', email ?? TEST_EMAIL);
	formData.set('password', password ?? TEST_PASSWORD);
	return formData;
};

describe('signIn | Server Action | Unit', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should set auth token if there is a token in response', async () => {
		const formData = getAuthFormData({});
		mockFetch(true, { token: TEST_AUTH_TOKEN_VALUE });
		await signIn(undefined, {}, formData);

		expect(setAuthToken).toHaveBeenCalledWith(TEST_AUTH_TOKEN_VALUE);
	});

	it('should not set auth token if there is no token in response', async () => {
		const formData = getAuthFormData({});
		mockFetch(true, {});
		await signIn(undefined, {}, formData);

		expect(setAuthToken).toHaveBeenCalledTimes(0);
	});

	it('should redirect to the dashboard home page on success', async () => {
		const formData = getAuthFormData({});
		mockFetch(true, { token: TEST_AUTH_TOKEN_VALUE });
		await signIn(undefined, {}, formData);

		expect(redirect).toHaveBeenCalledWith(paths.dashboard.root.getHref());
	});

	it('should redirect to provided "from" param on success', async () => {
		const formData = getAuthFormData({});
		mockFetch(true, { token: TEST_AUTH_TOKEN_VALUE });
		await signIn(TEST_REDIRECT_FROM, {}, formData);

		expect(redirect).toHaveBeenCalledWith(TEST_REDIRECT_FROM);
	});

	it('should return toast validation error on failed service auth', async () => {
		const formData = getAuthFormData({});
		mockFetch(false, { message: TEST_TOAST_INVALID_AUTH_DATA_MESSAGE });

		expect(signIn(TEST_REDIRECT_FROM, {}, formData)).resolves.toEqual({
			success: false,
			errors: {},
			toast: { message: TEST_TOAST_INVALID_AUTH_DATA_MESSAGE },
		} as ActionStateWithValidation);
	});

	it('should return email and password validation error on incorrect input data', async () => {
		const formData = getAuthFormData({ email: 'test', password: '' });

		expect(signIn(TEST_REDIRECT_FROM, {}, formData)).resolves.toEqual({
			success: false,
			errors: {
				email: VALIDATION_INVALID_EMAIL,
				password: VALIDATION_EMPTY_PASSWORD,
			},
			toast: null,
		} as ActionStateWithValidation);
	});
});

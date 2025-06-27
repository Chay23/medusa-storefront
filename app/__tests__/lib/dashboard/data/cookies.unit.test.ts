import { TEST_AUTH_TOKEN_VALUE } from '@/app/__tests__/__lib__/__constants__';
import { AUTH_COOKIE_NAME } from '@/lib/dashboard/constants/cookies';
import { getAuthHeader, setAuthToken } from '@/lib/dashboard/data/cookies';

const mockSet = jest.fn();
const mockGet = jest.fn();

jest.mock('next/headers', () => ({
	cookies: () => ({
		set: mockSet,
		get: mockGet,
	}),
}));

describe('setAuthToken | Server Action | Unit', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should set auth token in cookies', async () => {
		await setAuthToken(TEST_AUTH_TOKEN_VALUE);
		expect(mockSet).toHaveBeenCalledWith(
			AUTH_COOKIE_NAME,
			TEST_AUTH_TOKEN_VALUE,
			expect.anything()
		);
	});

	it('should get auth token from cookies', async () => {
		await getAuthHeader();
		expect(mockGet).toHaveBeenCalledWith(AUTH_COOKIE_NAME);
	});
});

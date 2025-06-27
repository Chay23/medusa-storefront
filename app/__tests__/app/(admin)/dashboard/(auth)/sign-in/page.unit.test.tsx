import SignIn from '@/app/(admin)/dashboard/(auth)/sign-in/page';
import { render, screen } from '@testing-library/react';

import { TEST_REDIRECT_FROM } from '@/app/__tests__/__lib__/__constants__';

const mockSearchParams = async (path: {
	[key: string]: string | undefined;
}) => {
	return path;
};

describe('Sign-in | Server Component | Unit', () => {
	beforeEach(async () => {
		render(
			await SignIn({
				searchParams: mockSearchParams({ from: TEST_REDIRECT_FROM }),
			})
		);
	});

	it('should render header text', () => {
		expect(screen.getByText(/welcome to dashboard/i)).toBeInTheDocument();
	});
});

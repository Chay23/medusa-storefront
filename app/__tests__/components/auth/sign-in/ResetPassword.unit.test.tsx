import ResetPassword from '@/components/dashboard/sign-in/ResetPassword';
import { render, screen } from '@testing-library/react';

describe('ResetPassword | Client Component | Unit', () => {
	beforeEach(() => {
		render(<ResetPassword />);
	});

	it('should render reset link', () => {
		expect(screen.getByText(/reset/i)).toBeInTheDocument();
	});
});

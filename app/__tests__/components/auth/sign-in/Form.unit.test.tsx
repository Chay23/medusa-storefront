import SignInForm from '@/components/dashboard/sign-in/Form';
import { render, screen, fireEvent } from '@testing-library/react';

describe('SignInForm | Client Component | Unit', () => {
	beforeEach(async () => {
		jest.clearAllMocks();
		render(<SignInForm from={undefined} />);
	});

	it('should render login form', () => {
		expect(screen.getByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByLabelText('Password')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /sign in/i })
		).toBeInTheDocument();
	});

	it('should toggle password visibility', () => {
		fireEvent.click(screen.getByTestId('toggle-password-visibility'));
		expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
	});
});

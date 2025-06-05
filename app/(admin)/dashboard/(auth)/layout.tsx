import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<main className='flex items-center justify-center min-h-screen'>
				{children}
			</main>
			;
			<Toaster position='bottom-right' />
		</>
	);
}

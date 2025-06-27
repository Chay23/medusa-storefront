import SignInForm from '@/components/dashboard/sign-in/Form';
import ResetPassword from '@/components/dashboard/sign-in/ResetPassword';

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function SignIn({ searchParams }: Props) {
	const { from } = await searchParams;

	return (
		<div className='flex flex-col items-center w-[300px] gap-6'>
			<h2 className='text-2xl'>Welcome to Dashboard</h2>
			<SignInForm from={from} />
			<ResetPassword />
		</div>
	);
}

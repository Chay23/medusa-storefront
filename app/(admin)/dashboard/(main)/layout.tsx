import Layout from '@/components/dashboard/layout/Layout';
import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
	return <Layout>{children}</Layout>;
}

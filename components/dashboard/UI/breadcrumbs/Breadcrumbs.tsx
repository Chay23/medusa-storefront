import { Breadcrumb } from '@/types/common/breadcrumbs';
import { BreadcrumbItem, Breadcrumbs as HeroBreadcrumbs } from '@heroui/react';
import Link from 'next/link';

type Props = {
	items: Breadcrumb[];
};

export default function Breadcrumbs({ items }: Props) {
	return (
		<HeroBreadcrumbs className='my-3'>
			{items.map((item) => (
				<BreadcrumbItem key={item.href}>
					<Link href={item.href}>{item.title}</Link>
				</BreadcrumbItem>
			))}
		</HeroBreadcrumbs>
	);
}

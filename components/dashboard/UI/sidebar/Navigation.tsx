import { Divider } from '@heroui/react';
import Link from 'next/link';

import { usePathname, useSearchParams } from 'next/navigation';
import { isActive, sidebarItems } from '@/components/dashboard/UI/sidebar/utils';

export default function Navigation({}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<div className='flex flex-col gap-1'>
			{sidebarItems.map((item, idx) =>
				item.type === 'divider' ? (
					<Divider key={idx} />
				) : (
					<Link
						key={item.key}
						href={
							isActive(item.key, pathname)
								? `${item.key}?${searchParams.toString()}`
								: item.key
						}
						className={`flex gap-5 items-center p-2 rounded-lg transition-all ease-in-out duration-300 hover:bg-primary-100 hover:text-primary ${
							isActive(item.key, pathname) ? 'bg-primary-100 text-primary' : ''
						}`}
					>
						<div>{item.icon}</div>
						<div>{item.label}</div>
					</Link>
				)
			)}
		</div>
	);
}

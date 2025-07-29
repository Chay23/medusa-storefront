import { cn } from '@heroui/theme';

import { COLOR_MAP } from '@/lib/dashboard/constants/ui';
import { UI } from '@/types/ui';

type Props = {
	color?: UI.ColorVariants;
	size?: string;
	className?: string;
};

export default function Dot({
	color = 'default',
	size = '8',
	className,
}: Props) {
	return (
		<span
			className={cn(`rounded-full ${COLOR_MAP[color]}`, className)}
			style={{
				width: `${size}px`,
				minWidth: `${size}px`,
				height: `${size}px`,
				minHeight: `${size}px`,
			}}
		></span>
	);
}

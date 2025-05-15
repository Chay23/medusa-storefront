import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import { paths } from './config/paths';

export function middleware(request: NextRequest) {
	const { nextUrl, cookies } = request;
	if (nextUrl.pathname === paths.dashboard.signIn.getHref()) {
		if (cookies.has('_admin_jwt')) {
			return NextResponse.redirect(
				new URL(paths.dashboard.root.getHref(), request.url)
			);
		}
		return NextResponse.next();
	}

	if (nextUrl.pathname.startsWith('/dashboard')) {
		if (!cookies.has('_admin_jwt')) {
			const url = new URL(paths.dashboard.signIn.getHref(), request.url);
			url.searchParams.set('from', request.nextUrl.pathname);
			return NextResponse.redirect(url);
		}
		return NextResponse.next();
	}
}

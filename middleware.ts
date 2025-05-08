import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const { nextUrl, cookies } = request;
	if (nextUrl.pathname === '/dashboard/sign-in') {
		if (cookies.has('_admin_jwt')) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}
		return NextResponse.next();
	}

	if (nextUrl.pathname.startsWith('/dashboard')) {
		if (!cookies.has('_admin_jwt')) {
			const url = new URL('/dashboard/sign-in', request.url);
			url.searchParams.set('from', request.nextUrl.pathname);
			return NextResponse.redirect(url);
		}
		return NextResponse.next();
	}
}

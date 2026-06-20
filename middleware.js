import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isSystemPath =
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/mycodes') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname.includes('.');

  if (isSystemPath) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL('/mycodes/index.html', request.url));
}

export const config = {
  matcher: ['/((?!api|_next|mycodes).*)']
};

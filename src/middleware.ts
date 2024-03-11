import { NextRequest, NextResponse } from 'next/server'
import path from 'path';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isCookiesExist = !!request.cookies.get("user_token")
  const isLoginPage = pathname.startsWith('/login');

  if (!isCookiesExist && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isCookiesExist && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}
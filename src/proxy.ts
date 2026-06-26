import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const protectedRoutes = ['/home', '/:path/dashboard'];
const authRoutes = ['/login', '/signup', '/reset-password', '/forgot-password'];

export function proxy(req: NextRequest) {

  const { pathname } = req.nextUrl;
  const isAuthenticated = req.cookies.has("accessToken");
  console.log("isAuthenticatd", isAuthenticated);


  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && authRoutes.some(route => pathname.startsWith(route))) {
    const dashboardUrl = new URL('/home', req.url);
    return NextResponse.redirect(dashboardUrl);
  }
}

 
export const config = {
  matcher: ["/home", "/login", "/signup", "/reset-password"],
}
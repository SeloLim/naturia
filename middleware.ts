// File: /middleware.ts
import { NextResponse, NextRequest } from 'next/server';

// Auth-required paths
const protectedPaths = ['/profile', '/cart', '/checkout', '/orders'];

// Public paths
const publicPaths = ['/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Get access token from cookies or local storage
  const token = request.cookies.get('naturia_access_token')?.value;
  
  // If path is protected and no token, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL('/auth/', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  
  // If path is public and has token, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected paths
    '/profile/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    // Public paths
    '/auth',
  ],
};
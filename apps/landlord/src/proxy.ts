import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Protected routes that require authentication
 */
const PROTECTED_ROUTES = [
  '/dashboard',
  '/settings',
  '/profile',
  // Add more protected routes here
];

/**
 * Public routes that don't require authentication
 */
const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/plans',
  '/',
];

/**
 * Check if token needs rotation based on virtual expiry
 */
async function shouldRotateToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const issuedAtCookie = cookieStore.get('token_issued_at');

  if (!issuedAtCookie) return false;

  const issuedAt = parseInt(issuedAtCookie.value, 10);
  const VIRTUAL_EXPIRY_MS = 12 * 60 * 1000; // 12 minutes
  const now = Date.now();
  const age = now - issuedAt;

  return age > VIRTUAL_EXPIRY_MS;
}

/**
 * Check if user is authenticated
 */
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth_token');
  return !!authCookie?.value;
}

/**
 * Check if route is protected
 */
function isProtectedRoute(pathname: string): boolean {
  // Remove locale prefix for route matching
  const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, '');

  return PROTECTED_ROUTES.some(route =>
    pathWithoutLocale.startsWith(route)
  );
}

/**
 * Main middleware function
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check authentication status
  const authenticated = await isAuthenticated();

  // Handle protected routes
  if (isProtectedRoute(pathname) && !authenticated) {
    // Redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Trigger token rotation if needed (for authenticated users)
  if (authenticated && await shouldRotateToken()) {
    // Trigger rotation in background (fire and forget)
    fetch(new URL('/api/auth/refresh', request.url).toString(), {
      method: 'POST',
      headers: {
        'Cookie': request.headers.get('cookie') || '',
      },
    }).catch(err => console.error('Token rotation failed:', err));
  }

  // Continue with next-intl middleware
  return createMiddleware(routing)(request);
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};

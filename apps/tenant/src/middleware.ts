import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // Define root domain from env, stripped of port for comparison if needed
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3001';

    // Log for debugging (shows in server console)
    console.log(`[Middleware] ${request.method} ${pathname} | Host: ${hostname} | Root: ${rootDomain}`);

    // Skip internal paths and assets
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Subdomain detection logic
    // 1. Host is "sub.root.com"
    // 2. Host is NOT "root.com"
    const isSubdomain = hostname !== rootDomain && hostname.endsWith(rootDomain);

    if (isSubdomain) {
        // Extract the subdomain part (e.g., "karim123" from "karim123.localhost:3001")
        const subdomain = hostname.replace(`.${rootDomain}`, '').split(':')[0];

        if (subdomain && subdomain !== 'www' && subdomain !== 'localhost') {
            // Check if URL already has a locale
            const hasLocale = pathname.startsWith('/en') || pathname.startsWith('/ar');
            const locale = hasLocale ? pathname.split('/')[1] : 'en';
            const pathAfterLocale = hasLocale ? pathname.replace(/^\/(en|ar)/, '') : pathname;

            const targetPath = `/${subdomain}/${locale}${pathAfterLocale}`;
            console.log(`[Middleware] ✅ Subdomain "${subdomain}" detected. Rewriting to: ${targetPath}`);

            const response = NextResponse.rewrite(new URL(targetPath, request.url));
            // Important for downstream identification
            response.headers.set('X-Tenant-ID', subdomain);
            return response;
        }
    }

    console.log(`[Middleware] ℹ️ No subdomain or matches root. Using default routing.`);
    return handleI18nRouting(request);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // Define root domain from env
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3001';

    // SERVER-SIDE LOG: This will show in the terminal where "pnpm dev" is running
    console.log(`[Middleware] ${request.method} ${hostname}${pathname}`);

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
    // We check if the hostname is different from rootDomain AND contains it
    const isSubdomain = hostname !== rootDomain && hostname.endsWith(rootDomain);

    if (isSubdomain) {
        // Extract the subdomain part
        const subdomain = hostname.replace(`.${rootDomain}`, '').split(':')[0];

        if (subdomain && subdomain !== 'www' && subdomain !== 'localhost') {
            const hasLocale = pathname.startsWith('/en') || pathname.startsWith('/ar');
            const locale = hasLocale ? pathname.split('/')[1] : 'en';
            const pathAfterLocale = hasLocale ? pathname.replace(/^\/(en|ar)/, '') : pathname;

            const url = request.nextUrl.clone();
            url.pathname = `/${subdomain}/${locale}${pathAfterLocale}`;

            console.log(`[Middleware] ✅ REWRITE: ${hostname}${pathname} -> ${url.pathname}${url.search}`);

            const response = NextResponse.rewrite(url);
            response.headers.set('X-Tenant-ID', subdomain);
            return response;
        }
    }

    console.log(`[Middleware] ℹ️ NO SUBDOMAIN: routing naturally`);
    return handleI18nRouting(request);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

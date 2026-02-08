import { NextRequest, NextResponse } from 'next/server';
import { setCustomerAuthCookie } from '@/lib/auth/cookies';

/**
 * special administrative login route for the tenant.
 * This route accepts a one-time authentication token (usually from the Landlord app)
 * and establishes a customer session for the tenant.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string; locale: string }> }
) {
    const { domain, locale } = await params;
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const hostname = request.headers.get('host') || '';

    if (token) {
        try {
            await setCustomerAuthCookie(token);
        } catch (error) {
            // Handle cookie setting error silently or with a non-console error if needed
        }

        // Use explicit hostname from headers to avoid internal rewrite issues
        const protocol = request.nextUrl.protocol || 'http:';
        const finalRedirectUrl = `${protocol}//${hostname}/${locale}/dashboard`;

        return NextResponse.redirect(new URL(finalRedirectUrl));
    }

    const protocol = request.nextUrl.protocol || 'http:';
    return NextResponse.redirect(new URL(`${protocol}//${hostname}/${locale}/dashboard`));
}

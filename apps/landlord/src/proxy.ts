import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  return createMiddleware(routing)(request);
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};

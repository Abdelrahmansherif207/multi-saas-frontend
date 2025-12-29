const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@repo/ui', '@repo/themes'],
}

module.exports = withNextIntl(nextConfig);

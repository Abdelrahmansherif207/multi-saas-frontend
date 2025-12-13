/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@repo/ui'],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@repo/ui'],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
            },
        ],
    },
}

module.exports = nextConfig

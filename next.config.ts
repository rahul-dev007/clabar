// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true, // 👈 এই লাইনটি যোগ করুন
        contentDispositionType: 'attachment', // 👈 SVG সঠিকভাবে দেখানোর জন্য এই দুটি লাইনও যোগ করুন
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // 👈
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
};

export default nextConfig;
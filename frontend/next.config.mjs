/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // আপনার অন্য কনফিগারেশন
  // নতুন করে নিচের অংশটুকু যোগ করুন
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
// src/middleware.ts

// 🔴 এই লাইনটি NextAuth থেকে default এক্সপোর্ট ইম্পোর্ট করে
export { default } from "next-auth/middleware";

// 🔴 এই config অবজেক্টটি বলে দেয় কোন কোন রাউট সুরক্ষিত থাকবে
export const config = {
    matcher: [
        '/dashboard/:path*', // /dashboard এবং এর ভেতরের সব রাউট (যেমন: /dashboard/profile)
        '/pricing',          // /pricing রাউট
        // আপনি এখানে আরও সুরক্ষিত রাউট যোগ করতে পারেন
        // '/settings',
    ],
};
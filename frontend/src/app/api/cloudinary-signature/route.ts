// src/app/api/cloudinary-signature/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
    try {
        // ধাপ ১: ব্যবহারকারী লগইন করা আছে কিনা তা চেক করুন
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
            // কুকি সঠিকভাবে পড়ার জন্য এই অপশনগুলো যোগ করা ভালো
            secureCookie: process.env.NODE_ENV === 'production',
            cookieName: process.env.NODE_ENV === 'production'
                ? '__Secure-next-auth.session-token'
                : 'next-auth.session-token',
        });

        // যদি টোকেন না পাওয়া যায়, তাহলে Unauthorized এরর দিন
        if (!token) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // ধাপ ২: আপনার ব্যাকএন্ড API-কে কল করুন এবং কুকি ফরোয়ার্ড করুন
        // 🔴 এটিই মূল সমাধান: আমরা 'Cookie' হেডারটি ম্যানুয়ালি যোগ করছি
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cloudinary/signature`, {
            headers: {
                // ফ্রন্টএন্ড থেকে আসা কুকিগুলো কপি করে ব্যাকএন্ডে পাঠানো হচ্ছে
                'Cookie': req.headers.get('cookie') || '',
            },
        });

        // যদি ব্যাকএন্ড থেকে কোনো এরর আসে
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Backend signature fetch failed:', response.status, errorText);
            throw new Error('Failed to fetch signature from backend');
        }

        // যদি সবকিছু ঠিক থাকে, তাহলে ব্যাকএন্ডের ডেটা ফেরত দিন
        const data = await response.json();
        return NextResponse.json(data);

    } catch (error: any) {
        console.error("Signature API route error:", error.message);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
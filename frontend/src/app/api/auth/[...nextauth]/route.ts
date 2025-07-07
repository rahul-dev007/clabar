// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // 👈 lib ফোল্ডার থেকে আপনার কনফিগারেশন ইম্পোর্ট করুন

// NextAuth হ্যান্ডলার তৈরি করুন
const handler = NextAuth(authOptions);

// GET এবং POST রিকোয়েস্টের জন্য হ্যান্ডলারটি এক্সপোর্ট করুন
export { handler as GET, handler as POST };
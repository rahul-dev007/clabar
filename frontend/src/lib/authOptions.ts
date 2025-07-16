// src/lib/authOptions.ts

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "./axiosInstance"; // 👈 আপনার কাস্টম axiosInstance

// TypeScript টাইপ ডিফাইন করা হয়েছে
declare module "next-auth" {
    interface User { id: string; role?: string; }
    interface Session { user: User & { id: string; role?: string; }; }
}
declare module "next-auth/jwt" {
    interface JWT { id: string; role?: string; }
}

export const authOptions: NextAuthOptions = {
    // 1. আপনার লগইন প্রোভাইডারগুলো (অপরিবর্তিত)
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and Password are required.");
                }
                try {
                    const response = await axiosInstance.post('/api/auth/login', {
                        email: credentials.email,
                        password: credentials.password,
                    });
                    const backendResponse = response.data;
                    if (backendResponse && backendResponse.user) {
                        return backendResponse.user;
                    }
                    return null;
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || "Invalid credentials.";
                    throw new Error(errorMessage);
                }
            }
        })
    ],

    // 2. Callbacks
    callbacks: {
        // 🔴🔴 signIn কলব্যাকটি API ব্যবহারের জন্য আপডেট করা হয়েছে 🔴🔴
        async signIn({ user, account }) {
            // শুধুমাত্র সোশ্যাল প্রোভাইডার দিয়ে লগইন করলে এই কোড চলবে
            if (account?.provider === 'google' || account?.provider === 'github') {
                try {
                    // আমাদের তৈরি করা /api/auth/social-login এন্ডপয়েন্টকে কল করা হচ্ছে
                    await axiosInstance.post('/api/auth/social-login', {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        provider: account.provider,
                    });
                    
                    // API কল সফল হলে লগইন প্রক্রিয়াকে এগিয়ে যাওয়ার অনুমতি দেওয়া হচ্ছে
                    return true;

                } catch (error) {
                    console.error("Social login sync failed:", error);
                    // API কল ব্যর্থ হলে লগইন থামিয়ে দেওয়া হচ্ছে
                    return false; 
                }
            }
            // Credentials লগইনের জন্য কোনো API কল দরকার নেই, তাই সরাসরি true
            return true;
        },

        // jwt এবং session কলব্যাক অপরিবর্তিত থাকবে
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },

    // 3. সেশন এবং পেজ কনফিগারেশন (অপরিবর্তিত)
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
};
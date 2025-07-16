

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider'; // 👈 আমাদের তৈরি করা AuthProvider ইম্পোর্ট করুন

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Clabar',
    description: 'Your project description',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* 
                    AuthProvider দিয়ে children কে র‍্যাপ করা হচ্ছে।
                    এখন আপনার পুরো অ্যাপ SessionProvider এর আওতায় থাকবে।
                */}
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
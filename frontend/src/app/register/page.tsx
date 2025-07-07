'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { z } from 'zod';
import { registerSchema } from '@/lib/validationSchemas'; // আপনার স্কিমা পাথ সঠিক আছে কিনা নিশ্চিত করুন

// Zod স্কিমা থেকে TypeScript টাইপ তৈরি করা হয়েছে
type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // ইনপুট পরিবর্তনের সাথে সাথে এরর মুছে দেওয়া হচ্ছে
        if (errors[name as keyof RegisterFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError('');
        setSuccess('');

        // 1. Zod দিয়ে ক্লায়েন্ট-সাইড ভ্যালিডেশন
        const validationResult = registerSchema.safeParse(formData);

        if (!validationResult.success) {
            const fieldErrors: any = {};
            validationResult.error.errors.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        // 2. ভ্যালিডেশন সফল হলে API কল করা হচ্ছে
        setLoading(true);
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            if (!apiBaseUrl) {
                throw new Error("API base URL is not configured.");
            }
            // 🔴 আপনার ব্যাকএন্ড রাউটের সঠিক পাথ দিন: /api/auth/register
            await axios.post(`${apiBaseUrl}/api/auth/register`, validationResult.data, {
                withCredentials: true // কুকি পাঠানোর জন্য এটি খুব গুরুত্বপূর্ণ
            });

            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => router.push('/login'), 2000);

        } catch (err: any) {
            setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="text-gray-400 mt-2">Join us and start your journey!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* নাম ইনপুট */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="John Doe"
                            disabled={loading}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    {/* ইমেইল ইনপুট */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    {/* পাসওয়ার্ড ইনপুট */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* API থেকে আসা এরর বা সফল বার্তা */}
                    <div className="h-5 text-center">
                        {apiError && <p className="text-sm text-red-400">{apiError}</p>}
                        {success && <p className="text-sm text-green-400">{success}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : 'Register'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
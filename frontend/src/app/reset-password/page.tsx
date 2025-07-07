'use client';

import React, { Suspense } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// ছোট কম্পোনেন্ট যেটা useSearchParams ইউজ করবে
function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const emailFromUrl = searchParams.get('email') || '';
        setEmail(emailFromUrl);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

            await axios.post(`${apiBaseUrl}/api/auth/reset-password`, {
                email: email.trim().toLowerCase(),
                password: password.trim(),
            });

            setSuccess('Password has been reset successfully! Redirecting to login...');
            setTimeout(() => router.push('/login'), 2000);
        } catch (err: any) {
            console.error('Reset Password Error:', err.response?.data);
            setError(err.response?.data?.message || 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white">Reset Your Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-200">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 text-white bg-white/20 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!!email}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-200">New Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 mt-2 text-white bg-white/20 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400"
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-sm text-center text-red-400">{error}</p>}
                    {success && <p className="text-sm text-center text-green-400">{success}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 font-semibold text-white rounded-lg transition-colors ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

// Suspense দিয়ে র‍্যাপ করা মূল export
export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}

'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Next.js 13+ এর জন্য

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        await axios.post(`${apiBaseUrl}/api/auth/send-otp`, { email });

        setSuccess(`An OTP has been sent to ${email}. Redirecting to OTP verification page...`);

        // ✅ email query parameter দিয়ে redirect করো
        setTimeout(() => {
            router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
        }, 2000);
    } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    }
};


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white">Forgot Password</h2>
                <p className="text-center text-gray-300">
                    Enter your email to receive a One-Time Password (OTP).
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            className="text-sm font-medium text-gray-200"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 text-white bg-white/20 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-center text-red-400">{error}</p>
                    )}
                    {success && (
                        <p className="text-sm text-center text-green-400">{success}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Send OTP
                    </button>
                </form>
                <p className="text-sm text-center text-gray-300">
                    Remembered your password?{' '}
                    <a
                        href="/login"
                        className="font-semibold text-blue-400 hover:underline"
                    >
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}

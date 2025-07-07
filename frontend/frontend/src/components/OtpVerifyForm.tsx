// src/app/verify-otp/OtpVerifyForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function OtpVerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get('email') || '';

    const [email, setEmail] = useState(emailFromQuery);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setEmail(emailFromQuery);
    }, [emailFromQuery]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const res = await axios.post(`${apiBaseUrl}/api/auth/verify-otp`, {
                email: email.trim().toLowerCase(),
                code: otp.trim(),
            });

            setSuccess(res.data.message || 'OTP verified successfully!');
            setTimeout(() => {
                router.push(`/reset-password?email=${encodeURIComponent(email)}`);
            }, 1500);
        } catch (err: any) {
            console.error("API Error:", err.response?.data);
            setError(err.response?.data?.message || 'OTP verification failed.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white">Verify OTP</h2>
                <p className="text-center text-gray-300">Enter the OTP sent to your email.</p>

                <form onSubmit={handleVerify} className="space-y-4">
                    <input type="hidden" value={email} readOnly />

                    <div>
                        <label htmlFor="otp" className="text-sm font-medium text-gray-200">OTP</label>
                        <input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            required
                            maxLength={6}
                            className="w-full px-4 py-2 mt-2 text-white bg-white/20 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && <p className="text-sm text-center text-red-400">{error}</p>}
                    {success && <p className="text-sm text-center text-green-400">{success}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
}

'use client'; // এই কম্পোনেন্টটি ক্লায়েন্ট-সাইডে চলবে, কারণ এখানে ইন্টারেকশন আছে

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করুন
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // পাসওয়ার্ড দেখানোর জন্য নতুন স্টেট
    const [error, setError] = useState('');
    const router = useRouter();

    // ইমেইল/পাসওয়ার্ড দিয়ে লগইন করার ফাংশন (আগের মতোই)
    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else if (result?.ok) {
                router.push('/dashboard');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    // সোশ্যাল লগইন (Google/GitHub) হ্যান্ডেল করার ফাংশন (আগের মতোই)
    const handleSocialLogin = (provider: 'google' | 'github') => {
        signIn(provider, { callbackUrl: '/dashboard' });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>

                <form onSubmit={handleCredentialsLogin} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-200" htmlFor="email">
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

                    {/* === পাসওয়ার্ড ফিল্ড আপডেট করা হয়েছে === */}
                    <div>
                        <label className="text-sm font-medium text-gray-200" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'} // ডাইনামিক টাইপ
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 mt-2 text-white bg-white/20 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button" // ফর্ম সাবমিট হওয়া আটকানোর জন্য
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* === "Forgot Password?" লিঙ্ক যোগ করা হয়েছে === */}
                    <div className="text-right">
                        <a href="/forgot-password" className="text-sm font-semibold text-blue-400 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {error && <p className="text-sm text-center text-red-400">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>

                {/* বাকি অংশ আগের মতোই */}
                <div className="flex items-center justify-center space-x-2">
                    <hr className="w-full border-gray-600" />
                    <span className="text-gray-400">OR</span>
                    <hr className="w-full border-gray-600" />
                </div>

                <div className="space-y-4">
                    <button onClick={() => handleSocialLogin('google')} className="w-full flex items-center justify-center py-2 space-x-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                        <FaGoogle /> <span>Login with Google</span>
                    </button>
                    <button onClick={() => handleSocialLogin('github')} className="w-full flex items-center justify-center py-2 space-x-2 font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                        <FaGithub /> <span>Login with GitHub</span>
                    </button>
                </div>

                <p className="text-sm text-center text-gray-300">
                    Don't have an account?{' '}
                    <a href="/register" className="font-semibold text-blue-400 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
}
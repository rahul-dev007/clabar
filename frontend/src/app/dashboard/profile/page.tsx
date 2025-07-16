// src/app/dashboard/profile/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios'; // 👈 সাধারণ axios ইম্পোর্ট করা হয়েছে
import axiosInstance from '@/lib/axiosInstance'; // 👈 আমাদের কাস্টম axiosInstance ইম্পোর্ট করা হয়েছে

export default function ProfilePage() {
    const { data: session, update, status } = useSession();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // ফাইলের টাইপ এবং সাইজ ভ্যালিডেশন
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                setError('Invalid file type. Please select a PNG, JPG, or JPEG file.');
                e.target.value = ''; // ইনপুট ফিল্ড ক্লিয়ার করে দেওয়া
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('File is too large. Max size is 5MB.');
                e.target.value = '';
                return;
            }
            setSelectedFile(file);
            setMessage('');
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select an image first.');
            return;
        }
        setLoading(true);
        setMessage('');
        setError('');

        try {
            // Cloudinary-এর জন্য প্রয়োজনীয় তথ্য
            const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

            if (!apiKey || !cloudName) {
                throw new Error("Cloudinary environment variables are missing.");
            }

            // ধাপ ১: ব্যাকএন্ড থেকে সিগনেচার আনা (axiosInstance ব্যবহার করে)
            const signatureResponse = await axiosInstance.get('/api/cloudinary/signature');
            const { signature, timestamp } = signatureResponse.data;

            // ধাপ ২: Cloudinary-তে আপলোডের জন্য FormData তৈরি করা
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('api_key', apiKey);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('folder', 'clabar_profiles'); // Cloudinary-তে একটি ফোল্ডারে ছবি সেভ হবে

            // ধাপ ৩: Cloudinary-তে ছবি আপলোড (সাধারণ axios ব্যবহার করে)
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
            const cloudinaryResponse = await axios.post(cloudinaryUrl, formData);
            const imageUrl = cloudinaryResponse.data.secure_url;

            // ধাপ ৪: ব্যাকএন্ডে ছবির URL সেভ করা (axiosInstance ব্যবহার করে)
            await axiosInstance.put('/api/users/profile-image', { imageUrl });

            // ধাপ ৫: NextAuth সেশন আপডেট করা
            await update({ image: imageUrl });

            setMessage('Profile image updated successfully!');
            setSelectedFile(null); // আপলোড সফল হলে সিলেক্ট করা ফাইল ক্লিয়ার করে দিন

        } catch (err: any) {
            console.error('Upload Error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to upload image.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        router.push('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 overflow-hidden relative">
                
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 p-2 rounded-full text-gray-300 hover:bg-gray-700/50 transition-colors z-10"
                    aria-label="Go back"
                >
                    <FaArrowLeft size={20} />
                </button>

                <div className="p-6 pt-16">
                    <h1 className="text-2xl font-bold text-center mb-6">Your Profile</h1>

                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-600 shadow-lg">
                            <Image
                                key={session?.user?.image}
                                src={selectedFile ? URL.createObjectURL(selectedFile) : session?.user?.image || '/default-avatar.png'}
                                alt="Profile Picture"
                                fill
                                className="object-cover"
                                sizes="128px"
                                priority
                            />
                        </div>

                        <div className="text-center">
                            <h2 className="text-xl font-semibold">{session?.user?.name}</h2>
                            <p className="text-gray-400">{session?.user?.email}</p>
                        </div>

                        <div className="w-full pt-4 border-t border-gray-700">
                            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">
                                Change Profile Picture
                            </label>
                            <div className="flex items-center space-x-4">
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                                    disabled={loading}
                                />
                                <button
                                    onClick={handleUpload}
                                    disabled={loading || !selectedFile}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center shrink-0"
                                >
                                    {loading ? (
                                        <>
                                            <FaSpinner className="animate-spin mr-2" />
                                            Uploading...
                                        </>
                                    ) : (
                                        'Upload'
                                    )}
                                </button>
                            </div>

                            <div className="h-5 mt-3 text-center text-sm">
                                {message && <p className="text-green-400">{message}</p>}
                                {error && <p className="text-red-400">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
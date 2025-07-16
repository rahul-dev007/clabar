// app/dashboard/page.tsx
'use client';

import { useSession } from "next-auth/react";

export default function DashboardPage() {
    const { data: session } = useSession();

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-4">
                Welcome back, {session?.user?.name || 'User'}!
            </h1>
            <p className="text-gray-400 mb-8">
                Here's a quick overview of your workspace.
            </p>

            {/* ড্যাশবোর্ডের স্ট্যাটাস কার্ড */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* কার্ড ১ */}
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium text-gray-400">Total Projects</h3>
                    <p className="mt-2 text-3xl font-bold text-white">12</p>
                </div>
                {/* কার্ড ২ */}
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium text-gray-400">Active Tasks</h3>
                    <p className="mt-2 text-3xl font-bold text-white">5</p>
                </div>
                {/* কার্ড ৩ */}
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium text-gray-400">Team Members</h3>
                    <p className="mt-2 text-3xl font-bold text-white">3</p>
                </div>
                {/* কার্ড ৪ */}
                 <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium text-gray-400">Profile Completion</h3>
                    <p className="mt-2 text-3xl font-bold text-white">80%</p>
                </div>
            </div>

            {/* সাম্প্রতিক অ্যাক্টিভিটি */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <ul>
                        <li className="py-2 border-b border-gray-700">User 'Alex' completed task 'Design Landing Page'.</li>
                        <li className="py-2 border-b border-gray-700">New project 'Mobile App Redesign' created.</li>
                        <li className="py-2">You uploaded a new profile picture.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
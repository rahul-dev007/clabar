// app/dashboard/layout.tsx
'use client';

import { useState, Fragment, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { FaTachometerAlt, FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes, FaDollarSign, FaProjectDiagram } from 'react-icons/fa';
import { Transition, Menu, Dialog } from '@headlessui/react';

// সাইডবারের নেভিগেশন লিংক
const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FaTachometerAlt },
    { name: 'Projects', href: '/projects', icon: FaProjectDiagram },
    { name: 'Profile', href: '/dashboard/profile', icon: FaUser },
    { name: 'Pricing', href: '/pricing', icon: FaDollarSign },
];

const userNavigation = [
    { name: 'Your Profile', href: '/dashboard/profile' },
    { name: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            {/* মোবাইল সাইডবার */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex">
                        <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                            <FaTimes className="h-6 w-6 text-white" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex flex-grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <h1 className="text-2xl font-bold text-white">Clabar</h1>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <Link href={item.href} className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}>
                                                                <item.icon className="h-6 w-6 shrink-0" />
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* ডেস্কটপ সাইডবার */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                         <h1 className="text-2xl font-bold text-white">Clabar</h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}>
                                                <item.icon className="h-6 w-6 shrink-0" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* মূল কন্টেন্ট */}
            <div className="lg:pl-64">
                <header className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-gray-700 bg-gray-800/50 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 backdrop-blur-lg">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <FaBars className="h-6 w-6" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        {/* প্রোফাইল ড্রপডাউন */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                <Image className="h-8 w-8 rounded-full bg-gray-700 object-cover" src={session?.user?.image || '/default-avatar.png'} alt="User profile" width={32} height={32} />
                                <span className="hidden lg:flex lg:items-center">
                                    <span className="ml-4 text-sm font-semibold leading-6 text-white" aria-hidden="true">{session?.user?.name}</span>
                                </span>
                            </Menu.Button>
                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-gray-800 py-2 shadow-lg ring-1 ring-gray-700 focus:outline-none">
                                    {userNavigation.map((item) => (
                                        <Menu.Item key={item.name}>
                                            {({ active }) => (
                                                <Link href={item.href} className={`block px-3 py-1 text-sm leading-6 text-gray-300 ${active ? 'bg-gray-700' : ''}`}>
                                                    {item.name}
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    ))}
                                     <Menu.Item>
                                        {({ active }) => (
                                             <button onClick={() => signOut({ callbackUrl: '/login' })} className={`w-full text-left block px-3 py-1 text-sm leading-6 text-gray-300 ${active ? 'bg-gray-700' : ''}`}>
                                                Sign out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </header>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
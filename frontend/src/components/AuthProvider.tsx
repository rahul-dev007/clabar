// src/components/AuthProvider.tsx

'use client'; // 👈 এই লাইনটি খুব গুরুত্বপূর্ণ

import { SessionProvider } from 'next-auth/react';

type Props = {
    children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
    return <SessionProvider>{children}</SessionProvider>;
}
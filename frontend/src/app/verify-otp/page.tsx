// src/app/verify-otp/page.tsx
'use client';

import React, { Suspense } from 'react';
import OtpVerifyPage from '../../components/OtpVerifyForm';

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
      <OtpVerifyPage />
    </Suspense>
  );
}

import { z } from 'zod';

// ✅ Registration Validation
export const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// ✅ Login Validation
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

// ✅ OTP Schema
export const otpSchema = z.object({
  email: z.string().email(),
});
// ✅ Verify OTP Schema
export const verifyOtpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'OTP must be 6 digits'),
});
// ✅ Reset Password Schema
export const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
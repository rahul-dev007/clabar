import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

// আপনি এখানে আপনার অন্যান্য স্কিমাও যোগ করতে পারেন (login, resetPassword ইত্যাদি)
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }), // শুধু খালি আছে কিনা চেক করা
});
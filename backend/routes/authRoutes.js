// routes/authRoutes.js

// 🔹 IMPORTS
import express from 'express';
import { validate } from '../middleware/validate.js';

// 🔹 Validator imports
import {
  registerSchema,
  loginSchema,
  otpSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} from '../validators/authValidator.js';

// 🔹 Controller imports
import {
  register,
  login,
  socialLogin,
  sendOtp,
  verifyOtp,
  resetPassword,
} from '../controllers/authController.js';

// 🔹 ROUTER INIT
const router = express.Router();

// ============================
// 🔹 AUTH ROUTES
// ============================

// 🔸 Credentials-based Register/Login
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// 🔸 Social Login Sync (Google/GitHub)
// এখানে validate() লাগবে না কারণ Google/GitHub থেকে ভেরিফাই করা ডেটা আসবে
router.post('/social-login', socialLogin);

// 🔸 OTP-based Password Reset Flow
router.post('/send-otp', validate(otpSchema), sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
router.post('/reset-password', resetPassword);

// 🔚 EXPORT ROUTER
export default router;

// backend/models/OTP.js

import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expireIn: { type: Date, required: true },
}, { timestamps: true });

// 🔴 OTP মডেল তৈরি করে ডিফল্ট হিসেবে এক্সপোর্ট করা হচ্ছে
export default mongoose.model('OTP', otpSchema);
// backend/models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  provider: { type: String, default: 'credentials' },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

// 🔴 User মডেল তৈরি করে ডিফল্ট হিসেবে এক্সপোর্ট করা হচ্ছে
export default mongoose.model('User', userSchema);
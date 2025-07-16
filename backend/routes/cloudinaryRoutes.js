import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import authMiddleware from '../middleware/authMiddleware.js';

// Cloudinary কনফিগারেশন
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const router = express.Router();

// এই রাউটটি GET রিকোয়েস্ট হ্যান্ডেল করবে
router.get('/signature', authMiddleware, (req, res) => {
    console.log("✅ /api/cloudinary/signature রাউটে রিকোয়েস্ট এসেছে!"); // 👈 ডিবাগিং এর জন্য এটি যোগ করুন

    try {
        const timestamp = Math.round(new Date().getTime() / 1000);

        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp,
                folder: 'clabar_profiles', // (ঐচ্ছিক) আপলোডগুলো একটি ফোল্ডারে যাবে
            },
            process.env.CLOUDINARY_API_SECRET
        );

        // ✅ এই লাইনটি 200 OK রেসপন্স পাঠায়, যা 501 এররটিকে প্রতিরোধ করে
        res.status(200).json({ timestamp, signature });

    } catch (error) {
        console.error('❌ Cloudinary সিগনেচার তৈরিতে এরর:', error);
        res.status(500).json({ msg: 'Server error while creating signature.' });
    }
});

export default router;
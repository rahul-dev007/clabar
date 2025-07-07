// index.js (বা আপনার প্রধান সার্ভার ফাইল)

import dotenv from 'dotenv';
dotenv.config(); // 👈 সবার আগে

// 🔴🔴 শুধু এই লাইনটি পরিবর্তন করুন 🔴🔴
import connectDB from './config/db.js'; // `{}` ছাড়া ইম্পোর্ট করুন
import app from './app.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ সার্ভার চালু হতে ব্যর্থ!', err);
        process.exit(1);
    }
};

startServer();
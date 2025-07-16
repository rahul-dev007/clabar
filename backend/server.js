// clabar/backend/server.js
import 'dotenv/config';          // একদম প্রথম লাইন; extra dotenv.import/remove

import connectDB from './config/db.js'; // ← {} ছাড়া default‑ইম্পোর্ট
import app from './app.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB(); // DB connected ↔ MongoURI .env থেকে আসবে
        app.listen(PORT, () => {
            console.log(`✅ MongoDB Connected`);
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ সার্ভার চালু হতে ব্যর্থ!', err);
        process.exit(1);
    }
};

startServer();

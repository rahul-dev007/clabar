import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cloudinaryRoutes from './routes/cloudinaryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';  // <-- এখানে import ইউজ করলাম

const app = express();

// ✅ Multiple frontend domain গুলো এখানেই define করা হচ্ছে
const allowedOrigins = [
    'http://localhost:3000',
    'https://clabar-xzc1.vercel.app',
];

const corsOptions = {
    origin: (origin, callback) => {
        // Postman / curl এর জন্য origin undefined হলেও চলবে
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('❌ Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Middleware setup
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
    res.status(200).send('<h1>Clabar backend is running!</h1>');
});

// ✅ Upload routes
app.use("/api/upload", uploadRoutes);

// ✅ Error handling middleware (must be last middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message,
    });
});

export default app;

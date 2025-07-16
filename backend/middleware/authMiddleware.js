// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    let token;

    // ১. Authorization হেডার থেকে 'Bearer' টোকেন খোঁজা হচ্ছে
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 'Bearer ' অংশটুকু বাদ দিয়ে শুধু টোকেনটি নেওয়া হচ্ছে
            token = req.headers.authorization.split(' ')[1];

            // ২. টোকেন ভেরিফাই করা হচ্ছে
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // ৩. ইউজারকে খুঁজে req.user এ সেট করা হচ্ছে
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ msg: 'User not found in token' });
            }

            next(); // রিকোয়েস্টকে পরবর্তী ধাপে যাওয়ার অনুমতি দেওয়া হচ্ছে

        } catch (error) {
            console.error('Token verification failed:', error.message);
            return res.status(401).json({ msg: 'Not authorized, token failed or expired' });
        }
    }

    // যদি হেডার-এ কোনো টোকেন না পাওয়া যায়
    if (!token) {
        return res.status(401).json({ msg: 'Not authorized, no token in header' });
    }
};

export default authMiddleware;
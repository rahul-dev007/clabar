// backend/routes/userRoutes.js

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// @route   PUT /api/users/profile-image
// @desc    Update user profile image URL
// @access  Private
router.put('/profile-image', authMiddleware, async (req, res) => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ msg: 'Image URL is required.' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        user.profileImage = imageUrl;
        await user.save();

        res.status(200).json({
            msg: 'Profile image updated successfully!',
            imageUrl: user.profileImage
        });

    } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(500).send('Server Error');
    }
});

export default router;
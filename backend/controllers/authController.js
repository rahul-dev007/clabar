// backend/controllers/authController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import { generateOTP } from '../utils/otp.js';
import { sendEmail } from '../utils/mailer.js';

// ✅ Register Controller
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      provider: 'credentials',
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        provider: newUser.provider,
      },
    });

  } catch (err) {
    console.error("Error in register controller:", err);
    res.status(500).json({ message: "User registration failed." });
  }
};

// ✅ Login Controller (for CredentialsProvider)
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.provider !== 'credentials') {
      return res.status(400).json({ message: "Invalid credentials or login method." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // Token তৈরি করা (JWT used internally by NextAuth)
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
      },
    });

  } catch (err) {
    console.error("Error in login controller:", err);
    res.status(500).json({ message: "Login failed." });
  }
};

// ✅ Social Login Controller
export const socialLogin = async (req, res) => {
  const { name, email, image, provider } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        image,
        provider,
        password: "",
      });
      await user.save();
    } else {
      user.name = name;
      user.image = image;
      user.provider = provider;
      await user.save();
    }

    res.status(200).json({ message: "Social login successful.", user });

  } catch (err) {
    console.error("Error in socialLogin controller:", err);
    res.status(500).json({ message: "Social login failed." });
  }
};

// ✅ Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist." });
    }

    const code = generateOTP();
    const expireIn = new Date(Date.now() + 10 * 60 * 1000);// 10 মিনিট পরের সময়

    await OTP.findOneAndDelete({ email });
    await OTP.create({ email, code, expireIn });

    const html = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2>Password Reset OTP</h2>
        <p>Your OTP for Clabar is:</p>
        <p style="font-size: 24px; font-weight: bold;">${code}</p>
        <p>This OTP will expire in 10 minutes.</p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: 'Your Password Reset OTP for Clabar',
      html: html,
    });

    res.status(200).json({ message: 'OTP sent successfully to your email.' });

  } catch (err) {
    console.error('Error in sendOtp controller:', err);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};

// ✅ Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, code } = req.body;
  try {
    const otpDoc = await OTP.findOne({ email, code });

    if (!otpDoc) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    if (otpDoc.expireIn < new Date()) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (err) {
    console.error('Error in verifyOtp controller:', err);
    res.status(500).json({ message: 'OTP verification failed.' });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.provider = 'credentials';
    await user.save();

    // ✅ চাইলেই এই email এর OTP ডিলিট করে দিতে পারো:
    await OTP.deleteOne({ email });

    res.status(200).json({ message: 'Password has been reset successfully.' });

  } catch (err) {
    console.error('Error in resetPassword controller:', err);
    res.status(500).json({ message: 'Password reset failed.' });
  }
};

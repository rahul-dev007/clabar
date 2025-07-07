import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); // 🟢 খুব জরুরি

console.log("🔍 Email Env:", process.env.EMAIL_USER, process.env.EMAIL_PASS); // 👉 চেক করার জন্য


// 🔴 Transporter বাইরে তৈরি করুন, যাতে এটি রি-ইউজ করা যায়
const transporter = nodemailer.createTransport({
    service: 'gmail', // অথবা আপনার হোস্ট, পোর্ট ইত্যাদি
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // নিশ্চিত করুন এটি App Password
    },
});

// 🔴 ফাংশনটি এখন একটি options অবজেক্ট গ্রহণ করছে
export const sendEmail = async (options) => {
    try {
        const mailOptions = {
            from: `"Clabar Team" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', options.to);

    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // এররটি কন্ট্রোলারের কাছে পাঠিয়ে দিন
    }
};
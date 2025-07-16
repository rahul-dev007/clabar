'use client';

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-50 p-10">
      <section className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-8">
          About <span className="text-blue-600">Clabar</span>
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10">
          Welcome to <strong>Clabar</strong>, a full-featured modern web application designed with the latest technologies to provide a smooth and secure user experience.
          Our platform focuses on user authentication, profile management, and seamless interaction with backend APIs.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Tech Stack */}
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-indigo-800 border-b border-indigo-300 pb-2">
              Technology Stack
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
              <li><strong>Next.js</strong> - React framework for server-side rendering and static site generation.</li>
              <li><strong>Tailwind CSS</strong> - Utility-first CSS framework for rapid UI development.</li>
              <li><strong>Node.js & Express</strong> - Backend REST API development.</li>
              <li><strong>MongoDB</strong> - NoSQL database for flexible data storage.</li>
              <li><strong>NextAuth.js</strong> - Secure authentication handling with multiple providers.</li>
              <li><strong>Cloudinary</strong> - Cloud service for efficient image storage and optimization.</li>
              <li><strong>Axios</strong> - HTTP client for API requests and data fetching.</li>
            </ul>
          </div>

          {/* Development Process */}
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-indigo-800 border-b border-indigo-300 pb-2">
              Development Process
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              The project followed an agile development process, focusing on:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
              <li>Planning and requirement analysis.</li>
              <li>Designing UI/UX with Tailwind CSS for responsiveness and accessibility.</li>
              <li>Building RESTful APIs using Express and MongoDB.</li>
              <li>Implementing secure authentication using NextAuth.js with JWT tokens.</li>
              <li>Testing API endpoints with Postman and integrating frontend.</li>
              <li>Deploying the app on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Vercel</a> for global availability.</li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-800 border-b border-indigo-300 pb-2 text-center">
            Key Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
            <li className="bg-indigo-50 p-5 rounded-lg shadow hover:shadow-lg transition">
              User Registration & Login with secure JWT-based authentication
            </li>
            <li className="bg-indigo-50 p-5 rounded-lg shadow hover:shadow-lg transition">
              Password Reset with Email OTP Verification
            </li>
            <li className="bg-indigo-50 p-5 rounded-lg shadow hover:shadow-lg transition">
              Profile Management with Image Upload via Cloudinary
            </li>
            <li className="bg-indigo-50 p-5 rounded-lg shadow hover:shadow-lg transition">
              Responsive UI using Tailwind CSS for mobile & desktop
            </li>
            <li className="bg-indigo-50 p-5 rounded-lg shadow hover:shadow-lg transition">
              Role-based Access Control for Admin and User
            </li>
            <li className="bg-indigo-50 p-5 rounded-lg shadow hover:shadow-lg transition">
              Fast and Secure API communication using Axios
            </li>
          </ul>
        </section>

        {/* Call To Action */}
        <section className="mt-16 text-center">
          <p className="text-xl text-gray-800 mb-6">
            Ready to get started? Visit the login or register page below!
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              Register
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

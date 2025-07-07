// src/lib/axiosInstance.ts

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

// ... আপনার interceptor ...

export default axiosInstance;
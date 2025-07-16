// ✅  src/lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000", // ← নিজের API origin
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;

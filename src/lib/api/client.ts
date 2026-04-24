import axios from "axios";
import { API_URL, API_TIMEOUT } from "@/config/constants";

/**
 * Central Axios instance used throughout the entire app.
 *
 * Base URL   → set via NEXT_PUBLIC_API_BASE_URL + NEXT_PUBLIC_API_VERSION
 * Timeout    → set via NEXT_PUBLIC_API_TIMEOUT
 * Headers    → Content-Type + Accept set to application/json
 * Auth token → injected by the request interceptor in interceptors.ts
 *
 * ⚠️  When the team sends the real Spring Boot base URL, update
 *     NEXT_PUBLIC_API_BASE_URL in .env.local. Nothing else changes here.
 */
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // If Spring Boot uses cookies for sessions (not JWT), set withCredentials: true
  withCredentials: false,
});

export default apiClient;

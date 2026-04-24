import { AxiosError, InternalAxiosRequestConfig } from "axios";
import apiClient from "./client";
import { tokenManager } from "@/features/auth/utils/tokenManager";
import { ROUTES } from "@/config/routes";

import { API_BASE_URL } from "@/config/constants";

// ─────────────────────────────────────────────────────────────
// Request Interceptor — attach JWT to every request
// ─────────────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attach mandatory transaction ID headers (unique per request)
    config.headers["x-transactionId"] = crypto.randomUUID();
    config.headers["businessTransactionId"] = crypto.randomUUID();

    const urlString = config.url || "";

    // Route any calls starting with /config through the generic wrapper service
    if (urlString === "/config" || urlString.startsWith("/config/")) {
      const originalMethod = config.method?.toUpperCase() || "GET";

      // Calculate the intended backend endpoint Destination URL
      // E.g. /config/fetchApi -> /Config-Service/configuration-service/fetchApi
      const subPath = urlString.replace("/config", "");
      const destUrl = `/Config-Service/configuration-service${subPath}`;

      config.headers["destUrl"] = destUrl;
      config.headers["httpMethod"] = originalMethod;

      // Use absolute URL to bypass Axios' default baseURL (which includes /ums/api/v1)
      const baseDomain = API_BASE_URL.replace("/ums", "");
      config.url = `${baseDomain}/configwrapper/v1/wrapper/genericServiceApi`;

      // The wrapper API is always called via POST
      config.method = "POST";

      // Ensure there's a body payload (even if empty) to satisfy POST requirements
      if (!config.data) {
        config.data = {};
      }
    }

    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─────────────────────────────────────────────────────────────
// Response Interceptor — handle 401 errors
// ─────────────────────────────────────────────────────────────
// ⚠️  Token refresh is disabled until a real refresh endpoint is provided.
//     On 401, we clear tokens and redirect to login.

apiClient.interceptors.response.use(
  // Success — pass through
  (response) => response,

  // Error — handle 401 by clearing session
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Don't intercept 401s from auth-related endpoints (login itself, etc.)
    const authPaths = ["/user/login", "/user/register"];
    const requestUrl = originalRequest?.url || "";
    const isAuthEndpoint = authPaths.some((p) => requestUrl.includes(p));

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      // No real refresh endpoint available — clear session and redirect
      tokenManager.clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = ROUTES.LOGIN;
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;

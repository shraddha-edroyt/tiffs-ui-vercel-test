/**
 * Auth Service
 *
 * Endpoints:
 *   POST /user/login    → Login
 *   POST /user/register → Registration
 *   POST /user/sendOtp  → Send OTP (also in verificationService.ts)
 *   POST /user/verifyOtp→ Verify OTP (also in verificationService.ts)
 */

import apiClient from "@/lib/api/interceptors";
import { handleApiError } from "@/lib/api/errorHandler";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  AuthUser,
  AuthTokens,
} from "@/types/api.types";

// ─────────────────────────────────────────────────────────────
// Auth API Endpoints
// ─────────────────────────────────────────────────────────────


export async function loginApi(payload: LoginRequest): Promise<LoginResponse> {
  try {
    const { data } = await apiClient.post<{
      response: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        refresh_expires_in: number;
        token_type: string;
        session_state: string;
        emailVerified: boolean;
        phoneVerified: boolean;
      };
      businessTransactionId: string;
      transactionId: string;
    }>("/user/login", payload);

    const res = data.response;

    // Decode the JWT payload to extract user info
    const jwtPayload = JSON.parse(atob(res.access_token.split(".")[1]));

    const user: AuthUser = {
      id: jwtPayload.sub || "",
      email: jwtPayload.email || "",
      user_name: jwtPayload.preferred_username || "",
      firstName: jwtPayload.given_name || "",
      lastName: jwtPayload.family_name || "",
      role: "USER" as any, // role info is encrypted in roleId
      active: true,
      email_verified: res.emailVerified,
      phone_number_verified: res.phoneVerified,
    };

    const tokens: AuthTokens = {
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      tokenType: res.token_type,
      expiresIn: res.expires_in,
    };

    return { user, tokens };
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Register
 * POST /user/register
 */
export async function registerApi(
  payload: RegisterRequest
): Promise<{ message: string }> {
  try {
    const { data } = await apiClient.post<{
      transactionId: string;
      businessTransactionId: string;
      message: string;
    }>("/user/register", payload);
    return { message: data.message };
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Send OTP for email/phone verification
 */
export async function sendOtpApi(): Promise<void> {
  try {
    await apiClient.post("/user/send-otp");
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Verify OTP
 */
export async function verifyOtpApi(payload: {
  email_otp?: string;
  phone_otp?: string;
}): Promise<void> {
  try {
    await apiClient.post("/user/verifyOtp", payload);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Change Password
 */
export async function changePasswordApi(payload: {
  password: string;
  new_password: string;
  confirm_password: string;
}): Promise<void> {
  try {
    await apiClient.post("/user/change-password", payload);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Forgot Password
 */
export async function forgotPasswordApi(payload: {
  email: string;
}): Promise<void> {
  try {
    await apiClient.post("/user/forget-password", payload);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Forgot Username
 */
export async function forgotUsernameApi(payload: {
  email: string;
}): Promise<void> {
  try {
    await apiClient.post("/user/forget-username", payload);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Logout
 * ⚠️  Dummy endpoint — swallows errors. Tokens are cleared client-side regardless.
 */
export async function logoutApi(refreshToken: string): Promise<void> {
  try {
    await apiClient.post(
      "/auth/logout", // ← replace with real endpoint when available
      { refreshToken }
    );
  } catch (error) {
    // Swallow logout errors — we clear tokens client-side regardless
    console.warn("Logout API error (tokens cleared client-side):", error);
  }
}

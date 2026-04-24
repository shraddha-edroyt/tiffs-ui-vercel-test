/**
 * Verification Service
 *
 * Handles OTP-based email verification via the real backend API.
 *
 *   POST /user/sendOtp?email=...      → Send OTP
 *   POST /user/verify-otp             → Verify OTP
 */

import apiClient from "@/lib/api/interceptors";
import { handleApiError } from "@/lib/api/errorHandler";

/**
 * Send OTP to the user's registered email
 * POST /user/sendOtp?email=<email>
 */
export async function sendEmailOtp(email: string): Promise<void> {
  try {
    await apiClient.post(`/user/sendOtp`, null, {
      params: { email },
    });
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Verify the OTP entered by the user
 * POST /user/verify-otp
 */
export async function verifyEmailOtp(
  email: string,
  otp: string
): Promise<void> {
  try {
    await apiClient.post("/user/verifyOtp", null, {
      params: { otp },
    });
  } catch (error) {
    throw handleApiError(error);
  }
}

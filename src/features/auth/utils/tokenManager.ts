import Cookies from "js-cookie";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "@/config/constants";

const EMAIL_VERIFIED_KEY = "email_verified";

/**
 * Token Manager
 *
 * Stores access token in memory (for security) and refresh token in
 * an httpOnly-like cookie via js-cookie with a long expiry.
 *
 * In production, consider moving to httpOnly cookies set by the server
 * for maximum XSS protection.
 */

// In-memory store for the access token (cleared on page refresh → user must re-auth or use refresh token)
let _accessToken: string | null = null;

export const tokenManager = {
  // ── Setters ──────────────────────────────────────────────

  setTokens(accessToken: string, refreshToken: string): void {
    _accessToken = accessToken;

    // Store refresh token in a cookie (7 days)
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      expires: REFRESH_TOKEN_EXPIRY / 86_400_000, // convert ms to days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Also persist access token to sessionStorage so it survives route navigations
    if (typeof window !== "undefined") {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
  },

  // ── Getters ──────────────────────────────────────────────

  getAccessToken(): string | null {
    // If in-memory is empty (e.g., after page refresh), try sessionStorage
    if (!_accessToken && typeof window !== "undefined") {
      _accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return _accessToken;
  },

  getRefreshToken(): string | null {
    return Cookies.get(REFRESH_TOKEN_KEY) ?? null;
  },

  // ── Email Verified Flag ───────────────────────────────────

  setEmailVerified(verified: boolean): void {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(EMAIL_VERIFIED_KEY, String(verified));
    }
  },

  getEmailVerified(): boolean | null {
    if (typeof window !== "undefined") {
      const val = sessionStorage.getItem(EMAIL_VERIFIED_KEY);
      if (val === null) return null;
      return val === "true";
    }
    return null;
  },

  // ── Clear ─────────────────────────────────────────────────

  clearTokens(): void {
    _accessToken = null;
    Cookies.remove(REFRESH_TOKEN_KEY);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(EMAIL_VERIFIED_KEY);
    }
  },

  // ── Checks ────────────────────────────────────────────────

  hasTokens(): boolean {
    return !!(this.getAccessToken() || this.getRefreshToken());
  },
};

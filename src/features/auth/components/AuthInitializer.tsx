"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/authStore";
import { tokenManager } from "@/features/auth/utils/tokenManager";
import type { AuthUser } from "@/types/api.types";


// Auth pages where we should NOT attempt rehydration.
const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/reset-password"] ;

/**
 * AuthInitializer
 *
 * Mounted once inside the root layout providers. On mount it checks
 * whether we have stored tokens and, if so, decodes the JWT to
 * rehydrate the Zustand auth store — so a page refresh doesn't
 * log the user out.
 *
 * Uses local JWT decoding instead of a /auth/me API call.
 *
 * This component renders nothing to the DOM.
 */
export default function AuthInitializer() {
  const { setAuthenticated, setLoading, isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    function init() {
      // Skip rehydration on auth pages
      const isAuthPage = AUTH_PAGES.some(
        (r) => pathname === r || pathname.startsWith(r)
      );
      if (isAuthPage) {
        // Don't force isAuthenticated=false here — if user just logged in
        // and is navigating away, the store already has the correct state
        setLoading(false);
        return;
      }

      // If already authenticated (e.g. just logged in), skip rehydration
      if (isAuthenticated) {
        setLoading(false);
        return;
      }

      const accessToken = tokenManager.getAccessToken();

      if (!accessToken) {
        // No access token (e.g., sessionStorage cleared when tab was closed).
        // Clear the refresh token cookie too — otherwise middleware will keep
        // redirecting from /login back to / because it sees the cookie, causing
        // an infinite redirect loop.
        tokenManager.clearTokens();
        setAuthenticated(false);
        return;
      }

      try {
        // Decode JWT to extract user info
        const jwtPayload = JSON.parse(atob(accessToken.split(".")[1]));

        // Check if token is expired
        const now = Math.floor(Date.now() / 1000);
        if (jwtPayload.exp && jwtPayload.exp < now) {
          tokenManager.clearTokens();
          setAuthenticated(false);
          // Hard redirect to login — prevents blank screen from stale session
          window.location.href = "/login";
          return;
        }

        // email_verified in the JWT reflects the value at login-time.
        // After OTP verification we persist the flag separately in sessionStorage
        // so a page refresh doesn't incorrectly bounce the user back to /verify-email.
        const persistedEmailVerified = tokenManager.getEmailVerified();

        const user: AuthUser = {
          id: jwtPayload.sub || "",
          email: jwtPayload.email || "",
          user_name: jwtPayload.preferred_username || "",
          firstName: jwtPayload.given_name || "",
          lastName: jwtPayload.family_name || "",
          role: "USER" as any,
          active: true,
          email_verified:
            persistedEmailVerified !== null
              ? persistedEmailVerified          // use the saved post-OTP flag
              : (jwtPayload.email_verified ?? false), // fall back to JWT
        };

        setAuthenticated(true, user);
      } catch {
        // Token is malformed — clear and leave as unauthenticated
        tokenManager.clearTokens();
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [setAuthenticated, setLoading, isAuthenticated, pathname]);

  return null;
}


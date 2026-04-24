"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/authStore";
import { ROUTES } from "@/config/routes";
import LoadingSpinner from "@/components/feedback/LoadingSpinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard
 *
 * Wraps any page that requires authentication. If the user is not
 * authenticated (and auth isn't still loading) it redirects to /login.
 *
 * Uses window.location.href for login redirect (hard redirect) to ensure
 * middleware re-evaluates and the correct layout loads cleanly.
 * Uses router.replace for verify-email redirect (client-side) since the
 * user IS authenticated, just unverified.
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Hard redirect to login — ensures middleware re-runs and
        // the login page loads with the correct (non-dashboard) layout
        window.location.href = ROUTES.LOGIN;
      } else if (user && !user.email_verified) {
        // Soft redirect to verify-email — user is still authenticated
        router.replace(ROUTES.VERIFY_EMAIL);
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || (user && !user.email_verified)) {
    // While the redirect happens, render nothing
    return null;
  }

  return <>{children}</>;
}


import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AuthUser } from "@/types/api.types";
import { tokenManager } from "@/features/auth/utils/tokenManager";

// ─────────────────────────────────────────────────────────────
// Auth Store — Zustand (global state)
// ─────────────────────────────────────────────────────────────

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: AuthUser) => void;
  setLoading: (loading: boolean) => void;
  setAuthenticated: (value: boolean, user?: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, // starts true to handle initial hydration

      setUser: (user) =>
        set({ user, isAuthenticated: true }, false, "auth/setUser"),

      setLoading: (isLoading) =>
        set({ isLoading }, false, "auth/setLoading"),

      setAuthenticated: (value, user) =>
        set(
          { isAuthenticated: value, user: user ?? null, isLoading: false },
          false,
          "auth/setAuthenticated"
        ),

      logout: () => {
        tokenManager.clearTokens();
        set(
          { user: null, isAuthenticated: false, isLoading: false },
          false,
          "auth/logout"
        );
      },
    }),
    { name: "AuthStore" }
  )
);

// Selector hooks for convenience
export const useCurrentUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
export const useAuthLoading = () => useAuthStore((s) => s.isLoading);

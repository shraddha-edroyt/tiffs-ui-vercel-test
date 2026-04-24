import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { loginApi, logoutApi, registerApi } from "@/features/auth/services/authService";
import { tokenManager } from "@/features/auth/utils/tokenManager";
import { useAuthStore } from "@/features/auth/store/authStore";
import { ROUTES } from "@/config/routes";
import { QUERY_KEYS } from "@/config/constants";
import type { ApiError, LoginRequest, RegisterRequest } from "@/types/api.types";

// ─────────────────────────────────────────────────────────────
// useAuth — primary auth hook
// ─────────────────────────────────────────────────────────────

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAuthenticated, logout: clearAuthState, user, isAuthenticated, isLoading } =
    useAuthStore();

  // ── Login Mutation ────────────────────────────────────────

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => loginApi(credentials),
    onSuccess: (data) => {
      // Store tokens
      tokenManager.setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      // Update global store
      setAuthenticated(true, data.user);
      // Warm up React Query cache with user data
      queryClient.setQueryData(QUERY_KEYS.AUTH.ME, data.user);

      toast.success(`Welcome back, ${data.user.firstName}!`);
      
      // Conditional redirection based on verification
      // Note: Phone verification is skipped (backend not ready) so we only check email
      if (data.user.email_verified) {
        router.replace(ROUTES.DASHBOARD);
      } else {
        router.replace(ROUTES.VERIFY_EMAIL);
      }
    },
    onError: (error: ApiError) => {
      const msg =
        error.status === 401
          ? "Invalid email or password. Please try again."
          : error.message || "Login failed. Please try again.";
      toast.error(msg);
    },
  });

  // ── Register Mutation ─────────────────────────────────────

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterRequest) => registerApi(payload),
    onSuccess: () => {
      toast.success(
        "Account created successfully! Please log in.",
        { duration: 4000 }
      );
      router.push(ROUTES.LOGIN);
    },
    onError: (error: ApiError) => {
      const msg =
        error.status === 409
          ? "An account with this email already exists."
          : error.message || "Registration failed. Please try again.";
      toast.error(msg);
    },
  });

  // ── Logout ────────────────────────────────────────────────

  const handleLogout = async () => {
    const refreshToken = tokenManager.getRefreshToken();
    if (refreshToken) {
      await logoutApi(refreshToken);
    }
    clearAuthState();
    queryClient.clear();
    router.replace(ROUTES.LOGIN);
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,

    // Login
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    loginError: loginMutation.error as ApiError | null,

    // Register
    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
    registerError: registerMutation.error as ApiError | null,

    // Logout
    logout: handleLogout,
  };
}

// ─────────────────────────────────────────────────────────────
// useLogin — standalone hook (used in LoginForm)
// ─────────────────────────────────────────────────────────────

export function useLogin() {
  const { login, isLoginLoading, loginError } = useAuth();
  return { login, isLoading: isLoginLoading, error: loginError };
}

// ─────────────────────────────────────────────────────────────
// useRegister — standalone hook (used in RegisterForm)
// ─────────────────────────────────────────────────────────────

export function useRegister() {
  const { register, isRegisterLoading, registerError } = useAuth();
  return { register, isLoading: isRegisterLoading, error: registerError };
}

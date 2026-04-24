// ─────────────────────────────────────────────────────────────
// Application Routes
// ─────────────────────────────────────────────────────────────
// Centralise all route strings here so they can be refactored
// in one place and imported wherever needed.
// ─────────────────────────────────────────────────────────────

import { LogOut } from "lucide-react";

export const ROUTES = {
  // ── Public / Auth ─────────────────────────────────────────
  LOGIN: "/login",
  LOGOUT: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",


  DASHBOARD: "/",

  // ── User Management ───────────────────────────────────────
  USERS: "/users",
  USERS_DETAIL: (id: string | number) => `/users/${id}`,
  USER_PROFILE: "/users/profile",

  // ── API Management (Separate Section) ─────────────────────
  API_MANAGEMENT: "/apimanagement",
  API_MANAGEMENT_DETAIL: (id: string | number) =>
    `/api-management/${id}`,
  API_MANAGEMENT_NEW: "/api-management/new",

  // ── API Playground (Separate Section) ─────────────────────
  API_PLAYGROUND: "/apiplayground",
  API_PLAYGROUND_DETAIL: (id: string | number) =>
    `/api-playground/${id}`,

} as const;

// Routes that are publicly accessible (no auth required)
export const PUBLIC_ROUTES: string[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
 
];

// Routes that require specific roles (used by middleware + PermissionGate)
export const ROLE_ROUTES: Record<string, string[]> = {
  "/users": ["ADMIN"],
  "/users/:id": ["ADMIN"],
};
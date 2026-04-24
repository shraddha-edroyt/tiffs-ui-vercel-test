// ─────────────────────────────────────────────────────────────
// App Constants
// ─────────────────────────────────────────────────────────────

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Upnix";
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0";

// ─────────────────────────────────────────────────────────────
// API Configuration
// ─────────────────────────────────────────────────────────────

/**
 * Base URL of the Spring Boot backend.
 * ⚠️  Replace NEXT_PUBLIC_API_BASE_URL in .env.local when the team
 * provides the real endpoint.
 */
export const API_BASE_URL =
 
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";


export const API_VERSION =
  process.env.NEXT_PUBLIC_API_VERSION ?? "/api/v1";

export const API_TIMEOUT = Number(
  process.env.NEXT_PUBLIC_API_TIMEOUT ?? 30_000
);

// Full base for all axios requests
export const API_URL = `${API_BASE_URL}${API_VERSION}`;

// ─────────────────────────────────────────────────────────────
// Token / Auth Constants
// ─────────────────────────────────────────────────────────────

export const ACCESS_TOKEN_KEY =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY ?? "upnix_access_token";

export const REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY ?? "upnix_refresh_token";

export const ACCESS_TOKEN_EXPIRY = Number(
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY ?? 3_600_000 // 1 hour
);

export const REFRESH_TOKEN_EXPIRY = Number(
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY ?? 604_800_000 // 7 days
);

// ─────────────────────────────────────────────────────────────
// Pagination Defaults
// ─────────────────────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 0; // Spring Boot is 0-indexed

// ─────────────────────────────────────────────────────────────
// Query Keys (React Query)
// ─────────────────────────────────────────────────────────────

export const QUERY_KEYS = {
  AUTH: {
    ME: ["auth", "me"] as const,
  },
  USER: {
    PROFILE: ["user", "profile"] as const,
    ROLE_APPROVERS: ["user", "roleApprovers"] as const,
  },
  COMPANY: {
    PROFILE: ["company", "profile"] as const,
  },
  USERS: {
    LIST: ["users"] as const,
    DETAIL: (id: string | number) => ["users", id] as const,
  },
  APIS: {
    LIST: ["apis"] as const,
    DETAIL: (id: string | number) => ["apis", id] as const,
  },
} as const;

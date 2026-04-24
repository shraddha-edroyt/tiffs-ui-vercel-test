// ─────────────────────────────────────────────────────────────
// RBAC Permissions
// ─────────────────────────────────────────────────────────────
// Define roles and their allowed permissions.
// ⚠️  Adjust roles and permissions once the backend team
//     confirms the exact role names returned in the JWT.
// ─────────────────────────────────────────────────────────────

export type Role = "ADMIN" | "USER" | "VIEWER";

export type Permission =
  | "users:read"
  | "users:write"
  | "users:delete"
  | "apis:read"
  | "apis:write"
  | "apis:delete"
  | "apis:playground";

// Map each role to the set of permissions it grants
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    "users:read",
    "users:write",
    "users:delete",
    "apis:read",
    "apis:write",
    "apis:delete",
    "apis:playground",
  ],
  USER: [
    "apis:read",
    "apis:write",
    "apis:playground",
    "users:read",
    "users:write"
  ],
  VIEWER: [
    "apis:read",
    "apis:playground",
  ],
};

/**
 * Check if a role has a specific permission.
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Check if a role has ALL of the given permissions.
 */
export function hasAllPermissions(
  role: Role,
  permissions: Permission[]
): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

/**
 * Check if a role has ANY of the given permissions.
 */
export function hasAnyPermission(
  role: Role,
  permissions: Permission[]
): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

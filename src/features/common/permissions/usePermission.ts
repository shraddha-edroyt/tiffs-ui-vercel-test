import { useCurrentUser } from "@/features/auth/store/authStore";
import {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  type Permission,
  type Role,
} from "@/config/permissions";

/**
 * Hook to check permissions for the currently logged-in user.
 *
 * Usage:
 *   const { can, canAll, canAny, role } = usePermission();
 *   if (can("users:write")) { ... }
 */
export function usePermission() {
  const user = useCurrentUser();
  const role = user?.role as Role | undefined;

  return {
    role,

    /** Check single permission */
    can: (permission: Permission): boolean => {
      if (!role) return false;
      return hasPermission(role, permission);
    },

    /** Check if user has ALL listed permissions */
    canAll: (permissions: Permission[]): boolean => {
      if (!role) return false;
      return hasAllPermissions(role, permissions);
    },

    /** Check if user has ANY of the listed permissions */
    canAny: (permissions: Permission[]): boolean => {
      if (!role) return false;
      return hasAnyPermission(role, permissions);
    },

    isAdmin: role === "ADMIN",
    isUser: role === "USER",
    isViewer: role === "VIEWER",
  };
}

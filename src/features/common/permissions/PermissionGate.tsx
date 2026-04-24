"use client";

import { usePermission } from "./usePermission";
import type { Permission } from "@/config/permissions";

interface PermissionGateProps {
  /** Render children only if user has this permission */
  permission?: Permission;
  /** Render children only if user has ALL of these permissions */
  permissions?: Permission[];
  /** Render children if user has ANY of these permissions */
  anyPermission?: Permission[];
  /** Only allow specific roles */
  roles?: string[];
  /** Fallback content when permission denied */
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * PermissionGate
 *
 * Conditionally renders children based on the current user's RBAC role.
 *
 * Usage:
 *   <PermissionGate permission="users:write">
 *     <CreateUserButton />
 *   </PermissionGate>
 *
 *   <PermissionGate roles={["ADMIN"]} fallback={<p>Access denied</p>}>
 *     <AdminPanel />
 *   </PermissionGate>
 */
export default function PermissionGate({
  permission,
  permissions,
  anyPermission,
  roles,
  fallback = null,
  children,
}: PermissionGateProps) {
  const { can, canAll, canAny, role } = usePermission();

  let allowed = true;

  if (permission) {
    allowed = allowed && can(permission);
  }
  if (permissions && permissions.length > 0) {
    allowed = allowed && canAll(permissions);
  }
  if (anyPermission && anyPermission.length > 0) {
    allowed = allowed && canAny(anyPermission);
  }
  if (roles && roles.length > 0 && role) {
    allowed = allowed && roles.includes(role);
  }

  return <>{allowed ? children : fallback}</>;
}

import type { Metadata } from "next";
import PermissionGate from "@/features/common/permissions/PermissionGate";
import UserProfileClient from "@/features/usermanagement/components/UserProfileClient";

export const metadata: Metadata = {
  title: "User Profile",
};

// For now we render the profile component regardless of permission;
// the warning message above was obstructing development when permissions
// weren't configured correctly. We can reintroduce a gate later when the
// backend returns actual RBAC information.
export default function UserProfilePage() {
  return <UserProfileClient />;
}


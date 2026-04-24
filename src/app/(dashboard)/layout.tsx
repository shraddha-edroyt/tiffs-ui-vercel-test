// TEMP: AuthGuard is commented out for local development when the
// backend auth/RBAC isn't available. Re-enable by uncommenting the
// import and the wrapper below when API is ready.
import AuthGuard from "@/features/auth/components/AuthGuard";
import DashboardLayout from "@/components/layouts/DashboardLayout";

interface DashboardRouteLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard Route Group Layout
 *
 * All routes inside /(dashboard) are protected by AuthGuard.
 * The DashboardLayout provides the sidebar + header shell.
 */
export default function DashboardRouteLayout({
  children,
}: DashboardRouteLayoutProps) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}

import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

// When visiting /users we simply forward to the profile page for now.
// This ensures the breadcrumb "User Management" link doesn't 404.
export default function UsersIndexPage() {
  redirect(ROUTES.USER_PROFILE);
}

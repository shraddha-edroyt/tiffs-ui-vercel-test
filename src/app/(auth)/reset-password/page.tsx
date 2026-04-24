import type { Metadata } from "next";
import ResetPasswordClient from "./ResetPasswordClient";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password using the link sent to your email",
};

export default function ResetPasswordPage() {
  // client-side logic lives in a separate component
  return <ResetPasswordClient />;
}

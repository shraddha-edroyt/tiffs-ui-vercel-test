import type { Metadata } from "next";
import ForgotPasswordClient from "./ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request password reset link",
};

export default function ForgotPasswordPage() {
  // client-side logic lives in a separate component
  return <ForgotPasswordClient />;
}



import AuthPage from "@/features/auth/components/AuthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your UPNIX account",
};


const RegisterPage = () => {
  return (
    <div className="min-h-screen   flex justify-center ">
      <AuthPage initialTab="register" />
    </div>
  );
};

export default RegisterPage;
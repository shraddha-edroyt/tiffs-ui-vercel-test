// import type { Metadata } from "next";
// import LoginForm from "@/features/auth/components/LoginForm";

// export const metadata: Metadata = {
//   title: "Sign in",
// };

// export default function LoginPage() {
//   return <LoginForm />;
// }



import AuthPage from "@/features/auth/components/AuthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your UPNIX account",
};

const LoginPage = () => {
  return (
    <div className=" items-center justify-center ">
      <AuthPage initialTab="login" />
    </div>
  );
};

export default LoginPage;
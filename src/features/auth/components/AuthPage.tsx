
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TabSwitcher from "../../../components/ui/TabSwitcher";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage: React.FC<{ initialTab: "login" | "register" }> = ({
  initialTab,
}) => {
  const router = useRouter();

  const tabs = [
    { id: "login", label: "Login" },
    { id: "register", label: "Register" },
  ];

  const handleTabChange = (tabId: "login" | "register") => {
    router.push(`/${tabId}`);
  };

  return (
    <div className="w-full max-w-full mx-auto p-4 overflow-y-auto scrollbar-hide">
      <TabSwitcher
        tabs={tabs}
        activeTab={initialTab}
        onTabChange={(tabId) =>
          handleTabChange(tabId as "login" | "register")
        }
      />

      <div className="mt-6">
        {initialTab === "login" ? <LoginForm /> : <RegisterForm />}
      </div>

      <div className="mt-3 text-center">
        {initialTab === "login" ? (
          <>
            <span className="text-xs text-gray-400 font-medium">
              Don't have an account?
            </span>
            <button
              className="ml-1 text-xs text-[#8B31FF] font-bold hover:underline"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <span className="text-xs text-gray-400 font-medium">
              Already have an account?
            </span>
            <button
              className="ml-1 text-xs text-[#8B31FF] font-bold hover:underline"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

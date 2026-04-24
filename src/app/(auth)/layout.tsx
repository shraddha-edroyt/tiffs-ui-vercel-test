"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

// These pages provide their own full-page layout (bg image + centered card)
const FULL_PAGE_ROUTES = ["/verify-email", "/forgot-password", "/reset-password"];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFullPage = FULL_PAGE_ROUTES.some((route) => pathname?.startsWith(route));

  // Full-page routes: render children directly, no wrapper
  if (isFullPage) {
    return <>{children}</>;
  }

  // Standard auth layout for login/register
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF] relative overflow-hidden ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#5B21B6 0.8px, transparent 0.8px)', 
             backgroundSize: '32px 32px' 
           }}>
      </div>

      {/* Main Container with 40:60 Ratio */}
      <div className="flex w-full  items-center px-6 lg:px-6 z-10">
        
        {/* Left Section (40% Width) */}
        <div className="hidden lg:flex w-[30%] justify-center pr-10 mb-20">
          <Image
            src="/logo.png"
            alt="UPNIX Logo"
            width={350}
            height={80}
            priority
            className="object-contain"
          />
        </div>

        {/* Right Section (60% Width) */}
        <div className="w-full lg:w-[70%] flex justify-end">
          {/* Card  */}
          <div className="w-full max-w-[650px] bg-white p-2 lg:p-2 rounded-lg shadow-lg shadow-gray-400 border border-white/50 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
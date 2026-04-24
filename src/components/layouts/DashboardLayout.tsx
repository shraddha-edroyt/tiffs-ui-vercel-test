"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex bg-[#F5F5F5]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header    
          onMenuToggle={() => setSidebarOpen((v) => !v)}
          sidebarOpen={sidebarOpen}
        />
        {/* Breadcrumb navigation */}
        <div className="px-4 py-3 border-gray-200">
          <Breadcrumb />
        </div>
        <main className="flex-1 p-4 overflow-auto mt-[-10px] scrollbar-hide">{children}</main>
      </div>
    </div>
  );
}
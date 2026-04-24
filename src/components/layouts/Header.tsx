"use client";

import { useState } from "react";
import { Bell, ChevronDown, LogOut, User, Search } from "lucide-react";
import { useCurrentUser } from "@/features/auth/store/authStore";
import { useAuth } from "@/features/auth/hooks/useAuth";
import NotificationDrawer from "./NotificationDrawer";
import Image from "next/image";

interface HeaderProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

export default function Header({ onMenuToggle, sidebarOpen }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const user = useCurrentUser();
  const { logout } = useAuth();

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "?";

  return (
    <>
      <header className="h-[60px]  border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
        {/* Left — search bar only */}
        <div className="flex items-center gap-4 w-full max-w-lg">
          {/* Search Bar */}
          <div className="flex bg-white items-center rounded-md px-3 py-1.5 w-full border-2">
            <Search className="h-4 w-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="border-none outline-none text-sm text-gray-700 w-full placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-2">
          {/* Notifications with red dot */}
          <button
            type="button"
            onClick={() => setNotificationDrawerOpen(true)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {/* Red dot */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* User menu with warning icon */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              {/* Avatar with warning icon */}
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-orange-300 shadow-sm">
                  <span className="text-xs font-semibold text-gray-500"><User/></span>
                </div>
                {/* Warning icon - top right */}
                <div className="absolute -top-1 -right-1 h-4 w-4">
                  <Image
                    src="/icons/warning.png"
                    alt="warning"
                    width={16}
                    height={16}
                    className="rounded-full"
                  />
                </div>
              </div>
              {/* <div className="hidden sm:block text-left">
                <p className="text-xs font-medium text-gray-800 leading-none">
                  {user ? `${user.firstName} ${user.lastName}` : "User"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-none">
                  {user?.role ?? ""}
                </p>
              </div> */}
              {/* <ChevronDown className="h-3.5 w-3.5 text-gray-400" /> */}
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-medium text-gray-800 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="h-3.5 w-3.5" />
                    Profile
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => {
                      setDropdownOpen(false);
                      void logout();
                    }}
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />
    </>
  );
}
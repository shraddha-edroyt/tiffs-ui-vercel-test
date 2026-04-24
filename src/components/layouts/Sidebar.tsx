"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { ROUTES } from "@/config/routes";
import PermissionGate from "@/features/common/permissions/PermissionGate";
import Image from "next/image";
import SubMenu from "./SubMenu";
import type { Permission } from "@/config/permissions";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  href?: string; // Make href optional for items with submenu
  /**
   * either a React component (lucide icon) or public image path
   */
  icon: React.ElementType | string;
  permission?: Permission;
  hasSubmenu: boolean;
  statusRestricted?: boolean;
  subItems?: {
    label: string;
    href: string;
    icon?: React.ElementType | string;
    permission?: Permission;
  }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: "/sidebar/dashboard.png",
    hasSubmenu: false,
  },
  {
    label: "User Management",
    icon: "/sidebar/users.png",
    hasSubmenu: true,
    subItems: [
      {
        label: "User Profile",
        href: ROUTES.USER_PROFILE,
        icon: "/sidebar/userprofile.png",
      },
    ],
  },
  {
    label: "API Management",
    href: ROUTES.API_MANAGEMENT,
    icon: "/sidebar/apimanagement.png",
    hasSubmenu: false,
    statusRestricted: true,
  },
  {
    label: "API Playground",
    // playground currently requires an API id; using APIS as a fallback until
    // a specific implementation or routing is added by the app.
    href: ROUTES.API_PLAYGROUND,
    icon: "/sidebar/apiplayground.png",
    hasSubmenu: false,
    statusRestricted: true,
  },
  {
    label: "Logout",
    href: ROUTES.LOGOUT,
    icon: "/sidebar/logout.png",
    hasSubmenu: false,
  },
];

import { useFetchUserProfile } from "@/features/usermanagement/hooks/useFetchUserProfile";

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { data: userProfile } = useFetchUserProfile();

  const isUserActive = userProfile?.accountStatus === "ACTIVE";

  const renderNavItem = (item: NavItem) => {
    // If item has submenu, render SubMenu (no href for the main item)
    if (item.hasSubmenu && item.subItems && item.subItems.length > 0) {
      return (
        <SubMenu
          key={item.label}
          title={item.label}
          icon={item.icon}
          items={item.subItems!}
          isSidebarOpen={isOpen}
          permission={item.permission}
        />
      );
    }

    // For regular items without submenu, ensure they have an href
    if (!item.href) {
      return null; // This shouldn't happen for non-submenu items
    }

    const isActive =
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

    const renderIcon = (icon: React.ElementType | string) => {
      if (typeof icon === "string") {
        return (
          <div className="h-5 w-5 flex items-center justify-center shrink-0">
            {isActive ? (
              <div 
                className="w-full h-full bg-purple-800"
                style={{
                  WebkitMaskImage: `url(${icon})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskImage: `url(${icon})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                }}
              />
            ) : (
              <Image
                src={icon}
                alt={item.label}
                width={20}
                height={20}
                className="object-contain"
              />
            )}
          </div>
        );
      }

      const IconComp = icon as React.ElementType;
      return (
        <IconComp
          className={clsx(
            "h-5 w-5 flex-shrink-0",
            isActive ? "text-purple-800" : "text-gray-400",
          )}
        />
      );
    };

    const linkElement = (
      <Link
        key={item.href}
        href={item.href}
        className={clsx(
          "flex items-center gap-3 px-3 py-2 rounded-s text-sm font-medium transition-all relative",
          isActive
            ? " text-purple-800 shadow-xs border-l-4 border-purple-800 "
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          !isOpen && "justify-center px-2",
        )}
        title={!isOpen ? item.label : undefined}
      >
        {isOpen ? (
          <div className="flex items-center gap-2 w-full">
            {renderIcon(item.icon)}
            <span className="truncate flex-1">{item.label}</span>
          </div>
        ) : (
          renderIcon(item.icon)
        )}
      </Link>
    );

    if (item.permission) {
      return (
        <PermissionGate key={item.href} permission={item.permission}>
          {linkElement}
        </PermissionGate>
      );
    }
    return linkElement;
  };

  return (
    <>
      {/* Sidebar panel */}
      <aside
        className={clsx(
          "relative bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0",
          isOpen ? "w-60" : "w-16",
        )}
      >
        {/* Logo and Toggle */}
        <div className={clsx("flex items-center h-[60px] border-b border-gray-200 flex-shrink-0", isOpen ? "justify-between px-3" : "justify-center")}>
          {isOpen && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Image
                src="/logo.png"
                alt="UPNIX Logo"
                width={350}
                height={80}
                priority
                className="object-contain max-w-[140px]"
              />
            </div>
          )}

          <button
            onClick={onToggle}
            className=" bg-white  items-center justify-center  flex-shrink-0"
          >
            <Image
              src="/sidebar/sidebar.png"
              alt="Toggle Sidebar"
              width={8}
              height={8}
              className={clsx("opacity- transition-transform duration-300", !isOpen && "rotate-180")}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            if (item.statusRestricted && !isUserActive) {
              return null;
            }
            return renderNavItem(item);
          })}
        </nav>
      </aside>
    </>
  );
}

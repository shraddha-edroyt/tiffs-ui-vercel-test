"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { clsx } from "clsx";
import PermissionGate from "@/features/common/permissions/PermissionGate";
import { usePermission } from "@/features/common/permissions/usePermission";
import type { Permission } from "@/config/permissions";

interface SubMenuItem {
  label: string;
  href: string;
  icon?: React.ElementType | string;
  permission?: Permission;
}

interface SubMenuProps {
  title: string;
  icon?: React.ElementType | string;
  items: SubMenuItem[];
  isSidebarOpen: boolean;
  /** Optional permission required to see the parent submenu */
  permission?: Permission;
}

export default function SubMenu({
  title,
  icon: Icon,
  items,
  isSidebarOpen,
  permission,
}: SubMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { can } = usePermission();

  const allowedItems = items.filter(
    (item) => !item.permission || can(item.permission),
  );

  if ((permission && !can(permission)) || allowedItems.length === 0) {
    return null;
  }

  // Check if any sub-item is active
  const hasActiveChild = allowedItems.some(
    (item) => pathname === item.href || pathname.startsWith(item.href),
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle click to toggle
  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      // Calculate position relative to viewport so menu appears OUTSIDE sidebar
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.right + 4, // 4px gap
      });
    }
    setIsOpen((prev) => !prev);
  };

  const renderIcon = (icon: React.ElementType | string | undefined, size = 20, isActive = false) => {
    if (!icon) return null;
    if (typeof icon === "string") {
      if (isActive) {
        return (
          <div 
            className="h-5 w-5 flex items-center justify-center shrink-0"
            style={{
              WebkitMaskImage: `url(${icon})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: `url(${icon})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              backgroundColor: '#9333ea', // purple-600
            }}
          />
        );
      }
      return (
        <Image 
          src={icon} 
          alt={title} 
          width={size} 
          height={size} 
          className="object-contain"
        />
      );
    }
    const IconComp = icon as React.ElementType;
    return (
      <IconComp 
        className={clsx(
          "h-5 w-5 flex-shrink-0",
          isActive ? "text-purple-600" : "text-gray-400"
        )} 
      />
    );
  };

  // Don't render submenu if sidebar is collapsed (keep simple button)
  if (!isSidebarOpen) {
    return (
      <div className="relative">
        <button
          className="flex items-center justify-center px-2 py-2 rounded-s text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full"
          title={title}
        >
          {renderIcon(Icon, 20, hasActiveChild)}
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Main menu item button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={clsx(
          "flex items-center justify-between w-full px-3 py-2 rounded-s text-sm font-medium transition-all",
          hasActiveChild
            ? "text-purple-800 shadow-xs border-l-4 border-purple-800"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        )}
      >
        <div className="flex items-center gap-3">
          {renderIcon(Icon, 20, hasActiveChild)}
          <span className="truncate">{title}</span>
        </div>
        <ChevronRight
          className={clsx(
            "h-4 w-4 flex-shrink-0 transition-transform duration-200",
            isOpen ? "rotate-90" : "",
            hasActiveChild ? "text-purple-600" : "text-gray-400",
          )}
        />
      </button>

      {/* Submenu dropdown - Fixed Position to break out of sidebar container */}
      {isOpen && (
        <div
          className="fixed w-48 bg-white shadow-lg border border-gray-200 z-[9999] py-1 mt-1 ml-2"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {allowedItems.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href);
            const ItemIcon = item.icon;

            const linkElement = (
              <Link
                key={index}
                href={item.href}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 text-sm rounded-s font-medium transition-all relative",
                  isActive
                    ? "border-l-4 border-purple-800 text-purple-800 ml-2"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {typeof ItemIcon === "string" ? (
                  isActive ? (
                    <div 
                      className="h-4 w-4 flex items-center justify-center shrink-0"
                      style={{
                        WebkitMaskImage: `url(${ItemIcon})`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskImage: `url(${ItemIcon})`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        backgroundColor: '#9333ea', // purple-600
                      }}
                    />
                  ) : (
                    <Image
                      src={ItemIcon}
                      alt={item.label}
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  )
                ) : ItemIcon ? (
                  <ItemIcon
                    className={clsx(
                      "h-4 w-4 flex-shrink-0",
                      isActive ? "text-purple-600" : "text-gray-400",
                    )}
                  />
                ) : (
                  <FileText
                    className={clsx(
                      "h-4 w-4 flex-shrink-0",
                      isActive ? "text-purple-600" : "text-gray-400",
                    )}
                  />
                )}
                <span className="truncate flex-1">{item.label}</span>
              </Link>
            );

            if (item.permission) {
              return (
                <PermissionGate key={index} permission={item.permission}>
                  {linkElement}
                </PermissionGate>
              );
            }
            return linkElement;
          })}
        </div>
      )}
    </div>
  );
}
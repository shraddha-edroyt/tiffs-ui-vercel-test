"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
    dashboard: "Dashboard",
    users: "User Management",
    profile: "User Profile",
    apimanagement: "API Management",
    apiplayground: "API Playground",
    create: "Create New API",
};

export default function Breadcrumb() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);

    // Common container styling to give breadcrumb a white background, padding, rounded corners, and full-width layout
    const containerClass = "bg-white px-3 py-3 rounded-md w-full flex items-center text-sm shadow";

    // If we're on the dashboard home
    if (paths.length === 0 || (paths.length === 1 && paths[0] === "dashboard")) {
        return (
            <div className={containerClass}>
                <ChevronRight className="h-3.5 w-3.5 text-gray-400 mx-2" />
                <span className="relative px-4 text-purple-600 font-medium">
                    Dashboard
                    <span className="absolute bottom-[-8px] left-0 w-full h-0.5 bg-purple-600"></span>
                </span>
            </div>
        );
    }

    return (
        <nav className={containerClass}>
            {paths.map((path, index) => {
                const isLast = index === paths.length - 1;
                const href = `/${paths.slice(0, index + 1).join("/")}`;
                const label = routeLabels[path] || path;

                return (
                    <div key={path} className="flex items-center">
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400 mx-1" />
                        {isLast ? (
                            <span className="relative px-4 text-purple-600 font-medium">
                                {label}
                                <span className="absolute bottom-[-8px] left-0 w-full h-0.5 bg-purple-600"></span>
                            </span>
                        ) : (
                            <Link href={href} className="text-gray-500 hover:text-purple-600">
                                {label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
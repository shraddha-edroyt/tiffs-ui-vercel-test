"use client";

import { X, Bell, CheckCircle, AlertCircle, Info } from "lucide-react";
import { clsx } from "clsx";

interface NotificationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const notifications = [
    {
        id: 1,
        title: "New user registered",
        message: "John Doe has created an account",
        time: "5 minutes ago",
        type: "success",
        read: false,
    },
    {
        id: 2,
        title: "API limit reached",
        message: "Your API usage has reached 80% of the limit",
        time: "1 hour ago",
        type: "warning",
        read: false,
    },
    {
        id: 3,
        title: "System update",
        message: "System will undergo maintenance at 2:00 AM",
        time: "3 hours ago",
        type: "info",
        read: true,
    },
];

const getIcon = (type: string) => {
    switch (type) {
        case "success":
            return <CheckCircle className="h-4 w-4 text-green-500" />;
        case "warning":
            return <AlertCircle className="h-4 w-4 text-yellow-500" />;
        case "info":
            return <Info className="h-4 w-4 text-blue-500" />;
        default:
            return <Bell className="h-4 w-4 text-gray-500" />;
    }
};

export default function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 z-40"
                onClick={onClose}
                aria-hidden="true"
            />
    
            {/* Drawer */}
            <div className="fixed right-0 top-[60px] w-96 h-[calc(60vh)] bg-white shadow-xl z-50 flex flex-col rounded-l-xl border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-gray-600" />
                        <h2 className="text-sm font-semibold text-gray-800">Notifications</h2>
                        <span className="bg-purple-100 text-purple-700 text-xs px-1.5 py-0.5 rounded-full">
                            2 new
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <X className="h-4 w-4 text-gray-500" />
                    </button>
                </div>

                {/* Notification List */}
                <div className="flex-1 overflow-y-auto">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={clsx(
                                "px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer",
                                !notification.read && "bg-purple-50/50"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">{getIcon(notification.type)}</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-sm font-medium text-gray-800">
                                            {notification.title}
                                        </h3>
                                        <span className="text-xs text-gray-400">{notification.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-600">{notification.message}</p>
                                </div>
                                {!notification.read && (
                                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-3">
                    <button className="w-full text-center text-xs text-purple-600 hover:text-purple-700 font-medium py-1.5 hover:bg-purple-50 rounded-md transition-colors">
                        Mark all as read
                    </button>
                </div>
            </div>
        </>
    );
}
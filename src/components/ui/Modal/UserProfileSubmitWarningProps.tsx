"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { clsx } from "clsx";

// Warning icon path from your spec
const WARNING_ICON_PATH = "/icons/warning.png";

interface UserProfileSubmitWarningProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const UserProfileSubmitWarning: React.FC<UserProfileSubmitWarningProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  // Escape key support
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Panel - Width: 475px, Height: 240px, Radius: 12px, Padding: 20px */}
      <div
        className={clsx(
          "relative bg-white rounded-xl p-3",
          "flex flex-col items-center"
        )}
        style={{
          width: "475px",
          height: "240px",
          fontFamily: "Roboto, sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Image */}
        <div className="flex justify-center flex-shrink-0 mb-3">
          <Image
            src={WARNING_ICON_PATH}
            alt="Warning"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center flex-1">
          {/* Message Line 1 */}
          <div className="text-base text-gray-600 text-center" style={{ fontWeight: 400 }}>
            You can submit your Role and Employee ID only once.
          </div>

          {/* Message Line 2 - Small gap below line 1 */}
          <div className="text-base text-gray-600 text-center mt-1" style={{ fontWeight: 400 }}>
            After submission, these details cannot be edited or updated.
          </div>

          {/* Notification Message - Medium gap above buttons */}
          <div className="text-sm text-gray-500 text-center mt-3" style={{ fontWeight: 400 }}>
            Your manager will be notified to approve your role.
          </div>

          {/* Action Buttons - Horizontal layout with top margin to push to bottom */}
          <div className="flex gap-3 w-full mt-auto pt-2">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="text-base font-medium transition-colors flex-1"
              style={{
                height: "40px",
                padding: "8px",
                borderRadius: "4px",
                fontWeight: 500,
                backgroundColor: "#B9B9B9",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#A0A0A0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#B9B9B9";
              }}
            >
              Cancel
            </button>

            {/* Submit Button */}
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="text-base font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              style={{
                height: "40px",
                padding: "8px",
                borderRadius: "4px",
                fontWeight: 500,
                background: "linear-gradient(135deg, #0B2A6D 0%, #651C96 50%, #FF9AFC 100%)",
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = "linear-gradient(135deg, #092260 0%, #54177d 50%, #e88aeb 100%)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = "linear-gradient(135deg, #0B2A6D 0%, #651C96 50%, #FF9AFC 100%)";
                }
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSubmitWarning;
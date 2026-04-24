"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { clsx } from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

  title?: string;
  message?: string;

  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;

  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;

  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;

  buttonClassName?: string;
  className?: string;
  overlayClassName?: string;
  width?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children?: React.ReactNode; //   For complex layout
  footer?: React.ReactNode; //   Custom footer support
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,

  title,
  message,

  imageSrc,
  imageAlt = "modal-image",
  imageWidth = 30,
  imageHeight = 30,

  showButton = true,
  buttonText = "",
  onButtonClick,

  closeOnBackdrop = true,
  closeOnEsc = true,

  buttonClassName = "",
  className = "",
  overlayClassName = "",
  width = "max-w-md",
  size = "md",
  children,
  footer,
}) => {
  const sizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  //   Escape key support
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  //   Body scroll lock
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
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center p-2",
        overlayClassName,
      )}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Modal Panel */}
      <div
        className={clsx(
          "relative w-full bg-white rounded-2xl shadow-xl p-4 text-center animate-fade-in",
          sizeClasses[size],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        {imageSrc && (
          <div className="flex justify-center mb-2">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
            />
          </div>
        )}

        {/* Title */}
        {title && (
          <h3 className="text-xs font-semibold  mb-2 text-gray-800">{title}</h3>
        )}

        {/* Message */}
        {message && <p className="text-sm text-gray-600 mb-4">{message}</p>}

        {/* Custom Content */}
        {children}

        {/* Footer */}
        {footer ? (
          <div className="mt-4">{footer}</div>
        ) : (
          showButton && (
            <button
              onClick={onButtonClick ?? onClose}
              className={clsx(
                "mt-2 w-full py-1 text-sm font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors",
                buttonClassName,
              )}
            >
              {buttonText}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Modal;

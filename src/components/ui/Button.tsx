
// Button.tsx
// Updated to ensure consistent sizing with inputs (h-[36px] standard)
import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
}) => {
  const baseClasses = `
    font-medium 
    rounded-lg 
    transition-all 
    duration-200 
    inline-flex 
    items-center 
    justify-center 
    gap-2
    ${fullWidth ? "w-full" : ""}
    ${disabled || loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
  `;

  const variantClasses = {
   primary: `
  text-white shadow-lg shadow-purple-200 
  ${disabled || loading 
    ? "bg-gray-300 text-gray-500 shadow-none" 
    : "bg-[linear-gradient(247.5deg,#0B2A6D_-33.44%,#651C96_48.2%,#FF9AFC_104.93%)] hover:opacity-90"
  }
`,
    secondary:
      "bg-white text-gray-800 shadow-sm hover:bg-gray-50",
    text:
      "text-gray-500 hover:text-gray-700 bg-transparent",
  };

  // Adjusted sm size to match input text size and padding
  const sizeClasses = {
    sm: "px-3 py-2 text-[11px]", 
    md: "px-8 py-2 text-sm",
    lg: "px-10 py-3 text-base",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <svg
          className="w-4 h-4 mr-2 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </button>
  );
};

export default Button;
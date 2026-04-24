import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: React.ReactNode;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconAction?: () => void;
}

const Input: React.FC<InputProps> = ({
  icon,
  iconPosition = "right",
  iconAction,
  className = "",
  ...props
}) => {
  return (
    <div className="relative">
      <input
        className={`
          w-full px-2 py-1.5 bg-[#F9FAFB]
          border border-gray-100 rounded-sm
          outline-none text-sm text-black
          placeholder:text-gray-400 placeholder:text-xs focus:border-purple-600
          ${icon && iconPosition === "left" ? "pl-10" : ""}
          ${icon && iconPosition === "right" ? "pr-10" : ""}
          ${className}
        `}
        {...props}
      />

      {icon && (
        <button
          type="button"
          onClick={iconAction}
          className={`absolute ${
            iconPosition === "right" ? "right-4" : "left-4"
          } top-1/2 -translate-y-1/2 text-gray-400`}
        >
          {icon}
        </button>
      )}
    </div>
  );
};


export default Input;

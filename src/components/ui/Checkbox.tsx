import React, { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className = "", ...props }) => {
  return (
    <label className={`flex items-center justify-center gap-2 text-[10px] text-[#A1A1A1] font-primary font-normal cursor-pointer border border-[#F1F1F1] rounded-full px-3 py-1.5 bg-white focus-within:ring-1 focus-within:ring-purple-200 ${className}`}>
      <input
        type="checkbox"
        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-3 h-3"
        {...props}
      />
      {label}
    </label>
  );
};

export default Checkbox;
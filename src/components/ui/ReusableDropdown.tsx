"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface Props {
  options: string[];        // dynamic list
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
   className?: string;        // wrapper ke liye
  triggerClassName?: string;
  labelKey?: string;      
  disabled?: boolean;
}

const ReusableDropdown: React.FC<Props> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className="",
  triggerClassName="",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Selected Field */}
      <div
        onClick={() => !disabled && setOpen(!open)}
        className={`w-full  px-2 py-1.5 bg-[#F9FAFB] border border-gray-200 rounded-sm 
        text-sm flex justify-between items-center ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} 
        ${value ? "text-black" : "text-gray-400"}${className}`}
      >
        {value || placeholder}
        <ChevronDown size={18} />
      </div>

      {/* Dropdown List */}
      {open && (
        <div className="absolute z-10 w-full bg-white rounded-md shadow-md max-h-40 overflow-y-auto scrollbar-hide">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-purple-600 hover:text-white"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReusableDropdown;

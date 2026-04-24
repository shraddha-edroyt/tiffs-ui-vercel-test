import React from "react";
import { clsx } from "clsx";

interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: React.ReactNode;
  children: React.ReactNode;
  layout?: "vertical" | "horizontal";
  className?: string;
  labelClassName?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  error,
  helperText,
  children,
  layout = "vertical",
  className,
  labelClassName,
}) => {
  const isHorizontal = layout === "horizontal";

  return (
    <div className={clsx("w-full", isHorizontal && "flex flex-col lg:flex-row lg:items-center gap-4", className)}>
      {label && (
        <label 
          className={clsx(
            "block font-normal font-tertiary text-[14px] leading-[26px] text-gray-500", 
            !isHorizontal && "mb-2",
            isHorizontal && "w-[100px] shrink-0",
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-gray-400 ml-1">*</span>}
        </label>
      )}

      {isHorizontal ? (
        <>
          {children}
          {(error || helperText) && (
            <div className="w-full lg:w-auto mt-1 lg:mt-0 lg:ml-2">
              {error && <p className="text-xs text-red-400">{error}</p>}
              {!error && helperText && <p className="text-[10px] text-gray-400">{helperText}</p>}
            </div>
          )}
        </>
      ) : (
        <>
          {children}
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          {!error && helperText && (
            <p className="text-[10px] text-gray-400 mt-1">{helperText}</p>
          )}
        </>
      )}
    </div>
  );
};

export default FormField;

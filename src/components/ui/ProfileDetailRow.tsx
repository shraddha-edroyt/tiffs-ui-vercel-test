import React from "react";
import { clsx } from "clsx";

interface ProfileDetailRowProps {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

export default function ProfileDetailRow({ label, value, valueClassName }: ProfileDetailRowProps) {
  return (
    <div className="flex items-center gap-2 text-[13px]">
      <span className="text-[#A1A1A1] font-medium w-[70px] shrink-0">{label}:</span>
      {typeof value === 'string' || typeof value === 'number' ? (
        <span className={clsx("font-semibold text-[#4A4A4A] truncate", valueClassName)}>
          {value}
        </span>
      ) : (
        <div className={clsx("font-semibold", valueClassName)}>
          {value}
        </div>
      )}
    </div>
  );
}

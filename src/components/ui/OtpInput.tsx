"use client";

import React, { useRef, useEffect } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  error = false,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newArr = value.split("").slice(0, length);
    newArr[idx] = val;
    const newVal = newArr.join("");
    onChange(newVal);

    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  useEffect(() => {
    // focus first empty cell when value or error changes
    const firstEmpty = value.split("").findIndex((v) => !v);
    if (firstEmpty !== -1) {
      inputsRef.current[firstEmpty]?.focus();
    }
  }, [value]);

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, i) => {
        const char = value[i] || "";
        return (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={char}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`w-12 h-12 text-center rounded-lg border-2 transition-colors duration-150 focus:outline-none focus:border-purple-600
              ${error ? "border-red-500" : "border-gray-300"}`}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;

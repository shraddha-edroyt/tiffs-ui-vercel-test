import React from "react";
import { clsx } from "clsx";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}

export function Heading({ level = 2, className, children, ...props }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;
  // Use secondary font for h2, others standard inherit
  return (
    <Tag 
      className={clsx(
        level !== 2 && "font-primary",
        level === 1 && "text-3xl font-bold",
        level === 2 && "text-lg font-bold font-secondary",
        level >= 3 && "font-semibold",
        className
      )} 
      {...props}
    >
      {children}
    </Tag>
  );
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "p" | "span";
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
  children: React.ReactNode;
}

export function Text({ variant = "p", weight, className, children, ...props }: TextProps) {
  const Tag = variant as React.ElementType;
  const weightStyles = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };
  return (
    <Tag 
      className={clsx("font-primary", weight && weightStyles[weight], className)} 
      {...props}
    >
      {children}
    </Tag>
  );
}

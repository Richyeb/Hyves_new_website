import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: "default" | "white";
}

export default function Logo({ className, iconOnly = false, variant = "default" }: LogoProps) {
  const iconColor = variant === "white" ? "#FFFFFF" : "#F9B509";
  const textColor = variant === "white" ? "#FFFFFF" : "#1C1C1C";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 shrink-0"
      >
        {/* Stylized Honeycomb Icon based on the attached logo */}
        <path
          d="M20 40L35 30L50 40L50 60L35 70L20 60V40Z"
          stroke={iconColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 40L65 30L80 40L80 60L65 70L50 60"
          stroke={iconColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 70L50 80L65 70"
          stroke={iconColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 30L50 20L65 30"
          stroke={iconColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!iconOnly && (
        <span 
          className={cn(
            "text-2xl font-bold tracking-tight",
            variant === "white" ? "text-white" : "text-hyves-black"
          )}
          style={{ color: textColor }}
        >
          hyves
        </span>
      )}
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: "default" | "white";
}
import logo from "@/assets/logo.png";

export default function Logo({ className, iconOnly = false, variant = "default" }: LogoProps) {
  const iconColor = variant === "white" ? "#FFFFFF" : "#F9B509";
  const textColor = variant === "white" ? "#FFFFFF" : "#1C1C1C";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
  src={logo}
  alt="Logo"
  className="w-10 h-10 object-contain"
/>

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

import React from "react";
import { cn } from "@/lib/utils";
import logo from "../assets/logo.svg";

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
      <img
  src={logo}
  alt="Logo"
  className="w-50 h-50 object-contain"
/>
    </div>
  );
}

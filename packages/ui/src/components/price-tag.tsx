import * as React from "react";
import { cn } from "../utils";

interface PriceTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  priceCents: number;
  currency: "EUR" | "USD";
  size?: "sm" | "md" | "lg";
  trend?: "up" | "down" | "stable";
}

function formatPrice(cents: number, currency: "EUR" | "USD"): string {
  const amount = cents / 100;
  if (currency === "EUR") {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function PriceTag({ priceCents, currency, size = "md", trend, className, ...props }: PriceTagProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const trendColors = {
    up: "text-green-400",
    down: "text-red-400",
    stable: "text-white/60",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono font-bold tabular-nums",
        sizeClasses[size],
        trend ? trendColors[trend] : "text-[var(--color-primary)]",
        className,
      )}
      {...props}
    >
      {formatPrice(priceCents, currency)}
      {trend === "up" && <span className="text-[0.7em]">+</span>}
      {trend === "down" && <span className="text-[0.7em]">-</span>}
    </span>
  );
}

export { PriceTag, formatPrice };

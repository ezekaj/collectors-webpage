import * as React from "react";
import { cn } from "../utils";

const conditionConfig: Record<string, { label: string; color: string }> = {
  MINT: { label: "Mint", color: "bg-[var(--color-grade-mint)] text-white" },
  NEAR_MINT: { label: "Near Mint", color: "bg-[var(--color-grade-nearmint)] text-white" },
  EXCELLENT: { label: "Excellent", color: "bg-[var(--color-grade-excellent)] text-white" },
  VERY_GOOD: { label: "Very Good", color: "bg-[var(--color-grade-verygood)] text-white" },
  GOOD: { label: "Good", color: "bg-[var(--color-grade-good)] text-white" },
  FAIR: { label: "Fair", color: "bg-[var(--color-grade-fair)] text-white" },
  POOR: { label: "Poor", color: "bg-[var(--color-grade-poor)] text-white" },
};

interface ConditionBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  condition: string;
}

function ConditionBadge({ condition, className, ...props }: ConditionBadgeProps) {
  const config = conditionConfig[condition] ?? { label: condition, color: "bg-white/10 text-white" };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wider",
        config.color,
        className,
      )}
      {...props}
    >
      {config.label}
    </span>
  );
}

export { ConditionBadge, conditionConfig };

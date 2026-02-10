import * as React from "react";
import { cn } from "../utils";

const rarityConfig: Record<string, { label: string; color: string; icon: string }> = {
  COMMON: { label: "Common", color: "text-gray-400 border-gray-400/30", icon: "C" },
  UNCOMMON: { label: "Uncommon", color: "text-green-400 border-green-400/30", icon: "U" },
  RARE: { label: "Rare", color: "text-blue-400 border-blue-400/30", icon: "R" },
  VERY_RARE: { label: "Very Rare", color: "text-purple-400 border-purple-400/30", icon: "VR" },
  ULTRA_RARE: { label: "Ultra Rare", color: "text-[var(--color-primary)] border-[var(--color-primary)]/30", icon: "UR" },
};

interface RarityBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  rarity: string;
}

function RarityBadge({ rarity, className, ...props }: RarityBadgeProps) {
  const config = rarityConfig[rarity] ?? { label: rarity, color: "text-gray-400 border-gray-400/30", icon: "?" };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider",
        config.color,
        className,
      )}
      {...props}
    >
      <span className="font-mono">{config.icon}</span>
      {config.label}
    </span>
  );
}

export { RarityBadge, rarityConfig };

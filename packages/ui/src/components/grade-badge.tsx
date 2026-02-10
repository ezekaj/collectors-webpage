import * as React from "react";
import { cn } from "../utils";

function getGradeColor(grade: number): string {
  if (grade >= 9.5) return "border-[var(--color-grade-mint)] text-[var(--color-grade-mint)]";
  if (grade >= 9.0) return "border-[var(--color-grade-nearmint)] text-[var(--color-grade-nearmint)]";
  if (grade >= 8.0) return "border-[var(--color-grade-excellent)] text-[var(--color-grade-excellent)]";
  if (grade >= 7.0) return "border-[var(--color-grade-verygood)] text-[var(--color-grade-verygood)]";
  if (grade >= 5.0) return "border-[var(--color-grade-good)] text-[var(--color-grade-good)]";
  if (grade >= 3.0) return "border-[var(--color-grade-fair)] text-[var(--color-grade-fair)]";
  return "border-[var(--color-grade-poor)] text-[var(--color-grade-poor)]";
}

function getGradeLetter(grade: number): string {
  if (grade >= 9.5) return "GM";
  if (grade >= 9.0) return "M";
  if (grade >= 8.5) return "NM/M";
  if (grade >= 8.0) return "NM";
  if (grade >= 7.0) return "E";
  if (grade >= 6.0) return "VG";
  if (grade >= 4.0) return "G";
  if (grade >= 2.0) return "F";
  return "P";
}

interface GradeBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  grade: number;
  size?: "sm" | "md" | "lg";
  showLetter?: boolean;
}

function GradeBadge({ grade, size = "md", showLetter = true, className, ...props }: GradeBadgeProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-base",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-full border-2 font-mono font-bold",
        sizeClasses[size],
        getGradeColor(grade),
        className,
      )}
      {...props}
    >
      <span className="leading-none">{grade.toFixed(1)}</span>
      {showLetter && size !== "sm" && (
        <span className="text-[0.6em] leading-none opacity-75">{getGradeLetter(grade)}</span>
      )}
    </div>
  );
}

export { GradeBadge, getGradeColor, getGradeLetter };

import * as React from "react";
import { cn } from "../utils";

interface MagazineCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "feature" | "standard" | "compact";
  imageUrl?: string;
  imageAlt?: string;
}

function MagazineCard({
  variant = "standard",
  imageUrl,
  imageAlt,
  children,
  className,
  ...props
}: MagazineCardProps) {
  const variantClasses = {
    feature: "col-span-2 row-span-2",
    standard: "",
    compact: "flex-row h-24",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/5 bg-[var(--color-card)] transition-all hover:border-[var(--color-primary)]/20 hover:shadow-lg hover:shadow-[var(--color-primary)]/5",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {imageUrl && (
        <div
          className={cn(
            "overflow-hidden",
            variant === "compact" ? "h-full w-24 shrink-0" : "aspect-[16/10]",
          )}
        >
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
            role="img"
            aria-label={imageAlt}
          />
        </div>
      )}
      <div className={cn("flex flex-col", variant === "compact" ? "flex-1 p-3" : "p-5")}>
        {children}
      </div>
    </div>
  );
}

function MagazineCardTag({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]",
        className,
      )}
      {...props}
    />
  );
}

function MagazineCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "mt-2 font-serif text-xl font-semibold leading-tight tracking-tight group-hover:text-[var(--color-primary)] transition-colors",
        className,
      )}
      {...props}
    />
  );
}

function MagazineCardExcerpt({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-2 line-clamp-2 text-sm text-white/60 leading-relaxed", className)}
      {...props}
    />
  );
}

function MagazineCardMeta({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto flex items-center gap-3 pt-4 text-xs text-white/40", className)}
      {...props}
    />
  );
}

export { MagazineCard, MagazineCardTag, MagazineCardTitle, MagazineCardExcerpt, MagazineCardMeta };

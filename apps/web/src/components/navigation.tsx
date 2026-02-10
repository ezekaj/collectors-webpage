"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";

const navItems = [
  { key: "marketplace", href: "/marketplace" },
  { key: "auctions", href: "/auctions" },
  { key: "priceGuide", href: "/price-guide" },
  { key: "catalogue", href: "/catalogue" },
  { key: "grade", href: "/grade" },
  { key: "editorial", href: "/editorial" },
  { key: "community", href: "/community" },
] as const;

export function Navigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-primary">
            Sammelfieber
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`rounded-md px-3 py-2 font-sans text-sm transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Locale Switcher */}
          <div className="flex rounded-md border border-border">
            <Link
              href={pathname || "/"}
              locale="de"
              className={`px-2 py-1 font-mono text-xs ${
                locale === "de"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              DE
            </Link>
            <Link
              href={pathname || "/"}
              locale="en"
              className={`px-2 py-1 font-mono text-xs ${
                locale === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </Link>
          </div>

          {/* Collection Link */}
          <Link
            href="/collection"
            className="rounded-md px-3 py-2 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("collection")}
          </Link>
        </div>
      </div>
    </header>
  );
}

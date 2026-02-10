"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Button, Separator } from "@sammelfieber/ui";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

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
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  function switchLocale(locale: "de" | "en") {
    router.replace(pathname, { locale });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[var(--color-background)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight">
            Sammel<span className="text-[var(--color-primary)]">fieber</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ key, href }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={key}
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
            <Search className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="mx-1 hidden h-6 lg:block" />

          {/* Locale Switcher */}
          <div className="hidden items-center gap-1 lg:flex">
            <button
              onClick={() => switchLocale("de")}
              className="rounded px-2 py-1 text-xs font-semibold text-white/60 hover:text-white"
            >
              DE
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => switchLocale("en")}
              className="rounded px-2 py-1 text-xs font-semibold text-white/60 hover:text-white"
            >
              EN
            </button>
          </div>

          <Link href="/collection">
            <Button variant="gold" size="sm" className="hidden lg:flex">
              {t("collection")}
            </Button>
          </Link>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white/60 hover:text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-white/5 bg-[var(--color-background)] lg:hidden">
          <nav className="flex flex-col px-4 py-4">
            {navItems.map(({ key, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-3 py-3 text-sm font-medium ${
                    isActive
                      ? "text-[var(--color-primary)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
            <Separator className="my-3" />
            <div className="flex items-center gap-2 px-3">
              <button onClick={() => switchLocale("de")} className="text-sm text-white/60">DE</button>
              <span className="text-white/20">|</span>
              <button onClick={() => switchLocale("en")} className="text-sm text-white/60">EN</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

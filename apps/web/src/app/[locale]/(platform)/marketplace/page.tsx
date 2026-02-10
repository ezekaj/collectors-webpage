import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function MarketplacePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarketplaceContent />;
}

function MarketplaceContent() {
  const t = useTranslations("marketplace");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl">{t("title")}</h1>
      <p className="mt-4 font-sans text-muted-foreground">
        Browse and buy collectibles from verified sellers worldwide.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="aspect-square bg-secondary" />
            <div className="p-4">
              <p className="font-mono text-xs text-muted-foreground">HOT WHEELS</p>
              <p className="mt-1 font-sans text-sm">Coming Soon</p>
              <p className="mt-2 font-mono text-lg font-semibold text-primary">--,-- &euro;</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

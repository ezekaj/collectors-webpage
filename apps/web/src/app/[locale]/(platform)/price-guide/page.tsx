import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function PriceGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PriceGuideContent />;
}

function PriceGuideContent() {
  const t = useTranslations("priceGuide");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl">{t("title")}</h1>
      <p className="mt-4 font-sans text-muted-foreground">
        Real-time market values powered by sales data and community insights.
      </p>

      <div className="mt-8 flex gap-4">
        <input
          type="text"
          placeholder={t("title")}
          className="w-full max-w-xl rounded-lg border border-border bg-card px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <div className="mt-12 rounded-lg border border-border bg-card p-8 text-center">
        <p className="font-sans text-muted-foreground">
          Search for an item to see its market value and price history.
        </p>
      </div>
    </div>
  );
}

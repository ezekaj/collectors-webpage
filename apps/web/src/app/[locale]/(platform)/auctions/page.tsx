import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function AuctionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AuctionsContent />;
}

function AuctionsContent() {
  const t = useTranslations("auction");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl">{t("title")}</h1>
        <span className="rounded-full bg-destructive px-3 py-1 font-mono text-xs font-bold text-white">
          {t("live")}
        </span>
      </div>
      <p className="mt-4 font-sans text-muted-foreground">
        Curated auction drops and live bidding on rare collectibles.
      </p>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl">{t("upcoming")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="aspect-video bg-secondary" />
              <div className="p-6">
                <p className="font-mono text-xs text-muted-foreground">CURATED DROP</p>
                <h3 className="mt-2 text-lg">Auction Event #{i}</h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground">Coming soon</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

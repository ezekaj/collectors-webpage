import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function CataloguePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CatalogueContent />;
}

function CatalogueContent() {
  const t = useTranslations("catalogue");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl">{t("title")}</h1>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-sans text-sm font-semibold text-primary-foreground">
          {t("scan")}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-0 rounded-full bg-primary transition-all" />
        </div>
        <span className="font-mono text-sm text-muted-foreground">
          0% {t("progress")}
        </span>
      </div>

      {/* Sticker Book Pages */}
      <div className="mt-12">
        <div className="mx-auto aspect-[3/2] max-w-4xl rounded-xl border-2 border-border bg-card p-8 shadow-2xl">
          <div className="flex h-full flex-col items-center justify-center">
            <p className="font-serif text-2xl text-muted-foreground">
              Hot Wheels 2026
            </p>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              Scan your first car to begin filling your catalogue
            </p>
            <div className="mt-8 grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square w-16 rounded-lg border-2 border-dashed border-border/50 bg-secondary/30"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

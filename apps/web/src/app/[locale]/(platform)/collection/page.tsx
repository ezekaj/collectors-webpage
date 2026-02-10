import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CollectionContent />;
}

function CollectionContent() {
  const t = useTranslations("collection");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl">{t("title")}</h1>
        <button className="rounded-md bg-primary px-4 py-2 font-sans text-sm font-semibold text-primary-foreground">
          {t("addItem")}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="font-sans text-sm text-muted-foreground">{t("totalValue")}</p>
          <p className="mt-1 font-mono text-3xl font-bold text-primary">0,00 &euro;</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="font-sans text-sm text-muted-foreground">{t("itemCount")}</p>
          <p className="mt-1 font-mono text-3xl font-bold">0</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="font-sans text-sm text-muted-foreground">{t("wishlist")}</p>
          <p className="mt-1 font-mono text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-dashed border-border bg-card/50 p-12 text-center">
        <p className="font-sans text-muted-foreground">
          Your collection is empty. Start by adding your first item!
        </p>
      </div>
    </div>
  );
}

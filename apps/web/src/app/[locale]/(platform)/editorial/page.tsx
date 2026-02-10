import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function EditorialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EditorialContent />;
}

function EditorialContent() {
  const t = useTranslations("nav");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl">{t("editorial")}</h1>
      <p className="mt-4 font-sans text-muted-foreground">
        Stories, guides, and insights from the collecting world.
      </p>

      {/* Featured Article - Full Width */}
      <div className="mt-12 overflow-hidden rounded-xl border border-border bg-card">
        <div className="aspect-[21/9] bg-secondary" />
        <div className="p-8">
          <p className="font-mono text-xs uppercase text-primary">Featured</p>
          <h2 className="mt-2 text-3xl">Coming Soon</h2>
          <p className="mt-3 max-w-2xl font-sans text-muted-foreground">
            Our editorial team is preparing in-depth articles about collecting,
            market trends, and collector spotlights.
          </p>
        </div>
      </div>

      {/* Article Grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <article key={i} className="group">
            <div className="aspect-[3/2] overflow-hidden rounded-lg bg-secondary" />
            <div className="mt-4">
              <p className="font-mono text-xs text-muted-foreground">GUIDE</p>
              <h3 className="mt-1 text-lg group-hover:text-primary">Article Placeholder</h3>
              <p className="mt-1 font-sans text-sm text-muted-foreground">
                Coming soon...
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

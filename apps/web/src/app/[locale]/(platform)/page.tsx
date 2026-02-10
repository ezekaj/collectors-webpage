import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section - Magazine Cover Style */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <h1 className="relative z-10 max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
          {t("home.hero.title")}
        </h1>
        <p className="relative z-10 mt-6 max-w-2xl font-sans text-xl text-muted-foreground">
          {t("home.hero.subtitle")}
        </p>
        <div className="relative z-10 mt-10 flex gap-4">
          <Link
            href="/marketplace"
            className="rounded-md bg-primary px-8 py-3 font-sans text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("nav.marketplace")}
          </Link>
          <Link
            href="/grade"
            className="rounded-md border border-border bg-card px-8 py-3 font-sans text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            {t("nav.grade")}
          </Link>
        </div>
      </section>

      {/* Editor's Picks */}
      <section className="border-t border-border py-16">
        <h2 className="mb-8 text-3xl">{t("home.editorsPicks")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
            >
              <div className="aspect-[4/3] bg-secondary" />
              <div className="p-6">
                <p className="font-mono text-xs text-muted-foreground">
                  HOT WHEELS
                </p>
                <h3 className="mt-2 text-lg">Coming Soon</h3>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  Featured collectibles will appear here
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending + Latest Articles Grid */}
      <section className="border-t border-border py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-3xl">{t("home.trending")}</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 border-b border-border/50 pb-4"
                >
                  <span className="font-mono text-3xl font-bold text-primary/30">
                    {String(i).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      HOT WHEELS
                    </p>
                    <p className="mt-1 font-sans text-sm">
                      Trending item placeholder
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-8 text-3xl">{t("home.latestArticles")}</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 rounded bg-secondary" />
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      EDITORIAL
                    </p>
                    <p className="mt-1 font-sans font-medium">
                      Article placeholder
                    </p>
                    <p className="mt-1 font-sans text-sm text-muted-foreground">
                      Coming soon...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          Sammelfieber &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

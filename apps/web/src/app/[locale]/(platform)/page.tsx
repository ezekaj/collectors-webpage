import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Badge,
  Separator,
  MagazineCard,
  MagazineCardTag,
  MagazineCardTitle,
  MagazineCardExcerpt,
  MagazineCardMeta,
  PriceTag,
  ConditionBadge,
  RarityBadge,
} from "@sammelfieber/ui";
import { ArrowRight, TrendingUp, Camera, BookOpen, Store, Trophy } from "lucide-react";

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
  const locale = useLocale();

  return (
    <div className="flex flex-col">
      {/* Hero Section - Magazine Cover */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-hw-red)]/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary)/8,transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="gold" className="mb-6">
                {locale === "de" ? "Die Zukunft des Sammelns" : "The Future of Collecting"}
              </Badge>
              <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
                {t("home.hero.title")}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
                {t("home.hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/marketplace">
                  <Button variant="gold" size="xl">
                    {t("nav.marketplace")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/grade">
                  <Button variant="outline" size="xl">
                    <Camera className="mr-2 h-4 w-4" />
                    {t("nav.grade")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Feature Card */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-card)] p-1 shadow-2xl shadow-[var(--color-primary)]/10">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)] flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
                      {locale === "de" ? "Ausgewahlt" : "Featured"}
                    </p>
                    <p className="mt-3 font-serif text-2xl font-semibold">
                      Hot Wheels
                    </p>
                    <p className="mt-1 text-sm text-white/40">
                      {locale === "de" ? "Entdecke die Sammlung" : "Explore the collection"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-mono text-xs text-white/40">2024 Super Treasure Hunt</p>
                    <p className="mt-1 font-serif text-lg font-semibold">&apos;67 Camaro</p>
                  </div>
                  <div className="text-right">
                    <ConditionBadge condition="MINT" />
                    <div className="mt-1">
                      <PriceTag priceCents={34500} currency="EUR" size="md" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative gradient glow */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-[var(--color-card)]/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-4">
          {[
            { value: "50K+", label: locale === "de" ? "Sammelobjekte" : "Collectibles" },
            { value: "12K+", label: locale === "de" ? "Sammler" : "Collectors" },
            { value: "AI", label: locale === "de" ? "Bewertung" : "Grading" },
            { value: "2", label: locale === "de" ? "Sprachen" : "Languages" },
          ].map((stat, i) => (
            <div key={i} className="px-6 py-6 text-center">
              <p className="font-mono text-2xl font-bold text-[var(--color-primary)]">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards - Magazine Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
              {locale === "de" ? "Plattform" : "Platform"}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {locale === "de" ? "Alles fur Sammler" : "Everything for Collectors"}
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/grade" className="group">
            <MagazineCard className="h-full">
              <div className="flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent">
                <Camera className="h-12 w-12 text-[var(--color-primary)] transition-transform group-hover:scale-110" />
              </div>
              <MagazineCardTag>{locale === "de" ? "KI-Bewertung" : "AI Grading"}</MagazineCardTag>
              <MagazineCardTitle>
                {locale === "de" ? "Zustand in Sekunden bewerten" : "Grade Condition in Seconds"}
              </MagazineCardTitle>
              <MagazineCardExcerpt>
                {locale === "de"
                  ? "Fotografiere dein Sammlerstuck und erhalte eine KI-gestutzte Zustandsbewertung mit Detailanalyse."
                  : "Photograph your collectible and receive an AI-powered condition grade with detailed analysis."}
              </MagazineCardExcerpt>
            </MagazineCard>
          </Link>

          <Link href="/marketplace" className="group">
            <MagazineCard className="h-full">
              <div className="flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-transparent">
                <Store className="h-12 w-12 text-blue-400 transition-transform group-hover:scale-110" />
              </div>
              <MagazineCardTag>{t("nav.marketplace")}</MagazineCardTag>
              <MagazineCardTitle>
                {locale === "de" ? "Kaufen, Verkaufen, Tauschen" : "Buy, Sell, Trade"}
              </MagazineCardTitle>
              <MagazineCardExcerpt>
                {locale === "de"
                  ? "Der sichere Marktplatz fur Sammler. Mit Treuhandservice, internationaler Lieferung und fairen Preisen."
                  : "The secure marketplace for collectors. With escrow, international shipping, and fair prices."}
              </MagazineCardExcerpt>
            </MagazineCard>
          </Link>

          <Link href="/catalogue" className="group">
            <MagazineCard className="h-full">
              <div className="flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-transparent">
                <BookOpen className="h-12 w-12 text-purple-400 transition-transform group-hover:scale-110" />
              </div>
              <MagazineCardTag>{t("nav.catalogue")}</MagazineCardTag>
              <MagazineCardTitle>
                {locale === "de" ? "Interaktives Stickeralbum" : "Interactive Sticker Book"}
              </MagazineCardTitle>
              <MagazineCardExcerpt>
                {locale === "de"
                  ? "Sammle, scanne und vervollstandige dein digitales Album mit Animationen und Achievements."
                  : "Collect, scan, and complete your digital album with animations and achievements."}
              </MagazineCardExcerpt>
            </MagazineCard>
          </Link>
        </div>
      </section>

      <Separator />

      {/* Editor's Picks + Trending Split */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Editor's Picks - 3 columns */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold">{t("home.editorsPicks")}</h2>
              <Link href="/editorial" className="text-sm text-[var(--color-primary)] hover:underline">
                {locale === "de" ? "Alle anzeigen" : "View all"}
                <ArrowRight className="ml-1 inline h-3 w-3" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                {
                  tag: "HOT WHEELS",
                  title: locale === "de" ? "Die seltensten Super Treasure Hunts 2024" : "The Rarest Super Treasure Hunts of 2024",
                  excerpt: locale === "de" ? "Ein Blick auf die begehrtesten Modelle des Jahres" : "A look at the most sought-after models of the year",
                },
                {
                  tag: locale === "de" ? "BEWERTUNGS-GUIDE" : "GRADING GUIDE",
                  title: locale === "de" ? "Zustandsbewertung fur Anfanger" : "Condition Grading for Beginners",
                  excerpt: locale === "de" ? "Alles was du uber die Bewertungsskala wissen musst" : "Everything you need to know about the grading scale",
                },
                {
                  tag: locale === "de" ? "MARKT-ANALYSE" : "MARKET ANALYSIS",
                  title: locale === "de" ? "Markttrends Q1 2026" : "Market Trends Q1 2026",
                  excerpt: locale === "de" ? "Welche Kategorien steigen im Wert?" : "Which categories are rising in value?",
                },
                {
                  tag: locale === "de" ? "SAMMLER-SPOTLIGHT" : "COLLECTOR SPOTLIGHT",
                  title: locale === "de" ? "Interview: 10.000 Hot Wheels in einer Sammlung" : "Interview: 10,000 Hot Wheels in One Collection",
                  excerpt: locale === "de" ? "Ein Blick hinter die Kulissen einer Mega-Sammlung" : "Behind the scenes of a mega collection",
                },
              ].map((article, i) => (
                <MagazineCard key={i} className="cursor-pointer">
                  <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-white/5 to-transparent" />
                  <MagazineCardTag>{article.tag}</MagazineCardTag>
                  <MagazineCardTitle className="text-base">{article.title}</MagazineCardTitle>
                  <MagazineCardExcerpt>{article.excerpt}</MagazineCardExcerpt>
                </MagazineCard>
              ))}
            </div>
          </div>

          {/* Trending - 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold">
                <TrendingUp className="mr-2 inline h-5 w-5 text-green-400" />
                {t("home.trending")}
              </h2>
            </div>
            <div className="mt-8 space-y-0 divide-y divide-white/5">
              {[
                { name: "'67 Camaro STH", price: 34500, trend: "+23%", rarity: "ULTRA_RARE" },
                { name: "Porsche 911 GT3", price: 8900, trend: "+18%", rarity: "RARE" },
                { name: "'55 Chevy Bel Air", price: 12500, trend: "+15%", rarity: "VERY_RARE" },
                { name: "Nissan Skyline R34", price: 5600, trend: "+12%", rarity: "RARE" },
                { name: "VW Drag Bus", price: 89000, trend: "+8%", rarity: "ULTRA_RARE" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-4">
                  <span className="w-8 font-mono text-2xl font-bold text-white/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-12 w-12 shrink-0 rounded-lg bg-[var(--color-card-elevated)]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <RarityBadge rarity={item.rarity} className="text-[10px] px-1.5 py-0" />
                    </div>
                  </div>
                  <div className="text-right">
                    <PriceTag priceCents={item.price} currency="EUR" size="sm" />
                    <p className="mt-0.5 font-mono text-xs text-green-400">{item.trend}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/price-guide" className="mt-6 block">
              <Button variant="outline" className="w-full">
                {t("nav.priceGuide")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-hw-red)]/5" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <Trophy className="mx-auto h-12 w-12 text-[var(--color-primary)]" />
          <h2 className="mt-6 font-serif text-3xl font-bold sm:text-4xl">
            {locale === "de" ? "Bereit zum Sammeln?" : "Ready to Start Collecting?"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-white/60">
            {locale === "de"
              ? "Tritt der Community bei und entdecke tausende Sammelobjekte."
              : "Join the community and discover thousands of collectibles."}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/sign-up">
              <Button variant="gold" size="xl">
                {locale === "de" ? "Jetzt starten" : "Get Started"}
              </Button>
            </Link>
            <Link href="/catalogue">
              <Button variant="outline" size="xl">
                {t("nav.catalogue")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[var(--color-card)]/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-serif text-lg font-bold">
                Sammel<span className="text-[var(--color-primary)]">fieber</span>
              </p>
              <p className="mt-2 text-sm text-white/40">
                {locale === "de"
                  ? "Die ultimative Plattform fur Sammler."
                  : "The ultimate platform for collectors."}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
                {locale === "de" ? "Plattform" : "Platform"}
              </p>
              <nav className="mt-3 flex flex-col gap-2">
                <Link href="/marketplace" className="text-sm text-white/40 hover:text-white">{t("nav.marketplace")}</Link>
                <Link href="/auctions" className="text-sm text-white/40 hover:text-white">{t("nav.auctions")}</Link>
                <Link href="/price-guide" className="text-sm text-white/40 hover:text-white">{t("nav.priceGuide")}</Link>
                <Link href="/grade" className="text-sm text-white/40 hover:text-white">{t("nav.grade")}</Link>
              </nav>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
                {locale === "de" ? "Community" : "Community"}
              </p>
              <nav className="mt-3 flex flex-col gap-2">
                <Link href="/catalogue" className="text-sm text-white/40 hover:text-white">{t("nav.catalogue")}</Link>
                <Link href="/editorial" className="text-sm text-white/40 hover:text-white">{t("nav.editorial")}</Link>
                <Link href="/community" className="text-sm text-white/40 hover:text-white">{t("nav.community")}</Link>
              </nav>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
                {locale === "de" ? "Sprachen" : "Languages"}
              </p>
              <div className="mt-3 flex gap-3">
                <span className="text-sm text-white/40">Deutsch</span>
                <span className="text-white/20">|</span>
                <span className="text-sm text-white/40">English</span>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center font-mono text-xs text-white/20">
            Sammelfieber &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarFallback,
} from "@sammelfieber/ui";
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  TrendingUp,
  Star,
  Newspaper,
  Lightbulb,
  ChevronRight,
} from "lucide-react";

export default async function EditorialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EditorialContent />;
}

const featuredArticle = {
  slug: "super-treasure-hunt-guide-2024",
  title: "The Ultimate Guide to 2024 Super Treasure Hunts",
  titleDe: "Der ultimative Guide zu 2024 Super Treasure Hunts",
  subtitle: "Everything you need to know about finding, identifying, and valuing this year's most sought-after Hot Wheels.",
  subtitleDe: "Alles was du uber das Finden, Identifizieren und Bewerten der begehrtesten Hot Wheels dieses Jahres wissen musst.",
  author: "Max Richter",
  authorRole: "Senior Editor",
  date: "2026-02-08",
  readTime: 12,
  category: "Guide",
};

const articles = [
  {
    slug: "market-report-q1-2026",
    title: "Q1 2026 Market Report: Hot Wheels Values Surge",
    titleDe: "Q1 2026 Marktbericht: Hot Wheels Werte steigen",
    category: "Market Report",
    author: "Sarah Chen",
    date: "2026-02-06",
    readTime: 8,
  },
  {
    slug: "collector-spotlight-jdm-dreams",
    title: "Collector Spotlight: The JDM Collection That Took 15 Years",
    titleDe: "Sammler-Spotlight: Die JDM-Sammlung die 15 Jahre brauchte",
    category: "Spotlight",
    author: "Tom Weber",
    date: "2026-02-04",
    readTime: 6,
  },
  {
    slug: "how-to-spot-fakes",
    title: "How to Spot Fake Super Treasure Hunts",
    titleDe: "Wie man gefalschte Super Treasure Hunts erkennt",
    category: "Guide",
    author: "Max Richter",
    date: "2026-02-02",
    readTime: 10,
  },
  {
    slug: "convention-recap-2026",
    title: "Hot Wheels Convention 2026: Everything We Know",
    titleDe: "Hot Wheels Convention 2026: Alles was wir wissen",
    category: "News",
    author: "Lisa Muller",
    date: "2026-01-30",
    readTime: 5,
  },
  {
    slug: "beginners-guide-grading",
    title: "Beginner's Guide to Condition Grading",
    titleDe: "Anfanger-Guide zur Zustandsbewertung",
    category: "Guide",
    author: "Sarah Chen",
    date: "2026-01-28",
    readTime: 15,
  },
  {
    slug: "top-10-rising-models",
    title: "Top 10 Models Rising in Value Right Now",
    titleDe: "Top 10 Modelle die gerade im Wert steigen",
    category: "Market Report",
    author: "Tom Weber",
    date: "2026-01-25",
    readTime: 7,
  },
];

const spotlights = [
  { name: "HWCollector_DE", items: 2847, topItem: "'67 Camaro STH Collection", since: "2019" },
  { name: "JDM_Dreams", items: 1234, topItem: "Complete Skyline Series", since: "2020" },
  { name: "VintageVault", items: 4521, topItem: "1969 Pink Rear-Loading Beach Bomb", since: "2015" },
];

const categoryIcons: Record<string, typeof BookOpen> = {
  Guide: Lightbulb,
  "Market Report": TrendingUp,
  Spotlight: Star,
  News: Newspaper,
};

function EditorialContent() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
          {locale === "de" ? "Redaktion" : "Editorial"}
        </p>
        <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          {locale === "de"
            ? "Geschichten, Guides & Einblicke"
            : "Stories, Guides & Insights"}
        </h1>
        <p className="mt-2 text-sm text-white/60">
          {locale === "de"
            ? "Tief eintauchen in die Welt des Sammelns. Geschrieben von Sammlern, fur Sammler."
            : "Deep dives into the world of collecting. Written by collectors, for collectors."}
        </p>
      </div>

      {/* Featured Article */}
      <Link href={`/editorial/${featuredArticle.slug}`} className="group mt-10 block">
        <Card className="overflow-hidden transition-all hover:border-[var(--color-primary)]/20 hover:shadow-lg hover:shadow-[var(--color-primary)]/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="aspect-[16/9] bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-card-elevated)] to-[var(--color-card)] lg:aspect-auto">
              <div className="flex h-full items-center justify-center">
                <BookOpen className="h-16 w-16 text-white/5" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <Badge variant="gold">
                  {locale === "de" ? "Empfohlen" : "Featured"}
                </Badge>
                <Badge variant="secondary">{featuredArticle.category}</Badge>
              </div>
              <h2 className="mt-4 font-serif text-2xl font-bold leading-tight group-hover:text-[var(--color-primary)] transition-colors lg:text-3xl">
                {locale === "de" ? featuredArticle.titleDe : featuredArticle.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {locale === "de" ? featuredArticle.subtitleDe : featuredArticle.subtitle}
              </p>
              <Separator className="my-5" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{featuredArticle.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium">{featuredArticle.author}</p>
                    <p className="text-[10px] text-white/30">{featuredArticle.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {featuredArticle.readTime} min
                  </span>
                  <span>
                    {new Date(featuredArticle.date).toLocaleDateString(
                      locale === "de" ? "de-DE" : "en-US",
                      { month: "short", day: "numeric" }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mt-12">
        <TabsList>
          <TabsTrigger value="all">
            <BookOpen className="mr-2 h-4 w-4" />
            {locale === "de" ? "Alle" : "All"}
          </TabsTrigger>
          <TabsTrigger value="guides">
            <Lightbulb className="mr-2 h-4 w-4" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="market">
            <TrendingUp className="mr-2 h-4 w-4" />
            {locale === "de" ? "Markt" : "Market"}
          </TabsTrigger>
          <TabsTrigger value="spotlights">
            <Star className="mr-2 h-4 w-4" />
            Spotlights
          </TabsTrigger>
        </TabsList>

        {/* All Articles */}
        <TabsContent value="all">
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const Icon = categoryIcons[article.category] || BookOpen;
              return (
                <Link key={article.slug} href={`/editorial/${article.slug}`} className="group">
                  <Card className="overflow-hidden transition-all hover:border-[var(--color-primary)]/20">
                    {/* Image */}
                    <div className="relative aspect-[3/2] bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]">
                      <div className="flex h-full items-center justify-center">
                        <Icon className="h-8 w-8 text-white/5" />
                      </div>
                      <div className="absolute left-3 top-3">
                        <Badge variant="secondary">{article.category}</Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-5">
                      <h3 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                        {locale === "de" ? article.titleDe : article.title}
                      </h3>
                      <Separator className="my-3" />
                      <div className="flex items-center justify-between text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime} min
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" size="lg">
              {locale === "de" ? "Mehr Artikel laden" : "Load More Articles"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Guides */}
        <TabsContent value="guides">
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles
              .filter((a) => a.category === "Guide")
              .map((article) => (
                <Link key={article.slug} href={`/editorial/${article.slug}`} className="group">
                  <Card className="overflow-hidden transition-all hover:border-[var(--color-primary)]/20">
                    <div className="relative aspect-[3/2] bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]">
                      <div className="flex h-full items-center justify-center">
                        <Lightbulb className="h-8 w-8 text-white/5" />
                      </div>
                      <div className="absolute left-3 top-3">
                        <Badge variant="gold">Guide</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                        {locale === "de" ? article.titleDe : article.title}
                      </h3>
                      <div className="mt-3 flex items-center justify-between text-xs text-white/40">
                        <span>{article.author}</span>
                        <span>{article.readTime} min</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </TabsContent>

        {/* Market Reports */}
        <TabsContent value="market">
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles
              .filter((a) => a.category === "Market Report")
              .map((article) => (
                <Link key={article.slug} href={`/editorial/${article.slug}`} className="group">
                  <Card className="overflow-hidden transition-all hover:border-[var(--color-primary)]/20">
                    <div className="relative aspect-[3/2] bg-gradient-to-br from-green-500/5 to-[var(--color-card)]">
                      <div className="flex h-full items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-white/5" />
                      </div>
                      <div className="absolute left-3 top-3">
                        <Badge variant="secondary">Market Report</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                        {locale === "de" ? article.titleDe : article.title}
                      </h3>
                      <div className="mt-3 flex items-center justify-between text-xs text-white/40">
                        <span>{article.author}</span>
                        <span>{article.readTime} min</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </TabsContent>

        {/* Collector Spotlights */}
        <TabsContent value="spotlights">
          <div className="mt-6 space-y-4">
            {spotlights.map((spotlight) => (
              <Card key={spotlight.name} className="group transition-all hover:border-[var(--color-primary)]/20">
                <CardContent className="flex items-center gap-6 p-6">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {spotlight.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-medium group-hover:text-[var(--color-primary)] transition-colors">
                        {spotlight.name}
                      </h4>
                      <Badge variant="gold">
                        <Star className="mr-1 h-3 w-3" />
                        Spotlight
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-white/40">
                      {locale === "de" ? "Highlight" : "Top Item"}: {spotlight.topItem}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-white/30">
                      <span>
                        {spotlight.items.toLocaleString()} {locale === "de" ? "Artikel" : "items"}
                      </span>
                      <span>
                        {locale === "de" ? "Sammler seit" : "Collecting since"} {spotlight.since}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-[var(--color-primary)]" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Newsletter CTA */}
      <section className="mt-16">
        <Card className="overflow-hidden bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent border-[var(--color-primary)]/10">
          <CardContent className="flex flex-col gap-6 p-8 text-center sm:p-10">
            <div>
              <h3 className="font-serif text-2xl font-bold">
                {locale === "de"
                  ? "Sammelfieber Newsletter"
                  : "Sammelfieber Newsletter"}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
                {locale === "de"
                  ? "Wochentliche Marktberichte, Sammlertipps und exklusive Einblicke direkt in dein Postfach."
                  : "Weekly market reports, collecting tips, and exclusive insights delivered to your inbox."}
              </p>
            </div>
            <div className="mx-auto flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder={locale === "de" ? "E-Mail-Adresse" : "Email address"}
                className="flex-1 rounded-lg border border-white/10 bg-[var(--color-card)] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-primary)] focus:outline-none"
              />
              <Button variant="gold">
                {locale === "de" ? "Abonnieren" : "Subscribe"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

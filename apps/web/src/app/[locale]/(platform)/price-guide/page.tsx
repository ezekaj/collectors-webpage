import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Card,
  CardContent,
  Input,
  Badge,
  Separator,
  PriceTag,
  ConditionBadge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@sammelfieber/ui";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  DollarSign,
  Users,
  ArrowRight,
  Flame,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";

export default async function PriceGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PriceGuideContent />;
}

const trendingItems = [
  {
    id: "1",
    name: "'67 Camaro STH",
    series: "2024 Super Treasure Hunt",
    avgPrice: 34500,
    change: 12.5,
    trend: "up" as const,
    volume: 48,
    condition: "MINT",
    currency: "EUR" as const,
  },
  {
    id: "2",
    name: "VW Drag Bus Convention",
    series: "2022 Convention Exclusive",
    avgPrice: 89000,
    change: 8.3,
    trend: "up" as const,
    volume: 12,
    condition: "MINT",
    currency: "EUR" as const,
  },
  {
    id: "3",
    name: "'55 Chevy Bel Air Gasser",
    series: "2023 RLC Exclusive",
    avgPrice: 12500,
    change: -3.2,
    trend: "down" as const,
    volume: 34,
    condition: "MINT",
    currency: "EUR" as const,
  },
  {
    id: "4",
    name: "Nissan Skyline GT-R R34",
    series: "2024 Premium",
    avgPrice: 2400,
    change: 0.0,
    trend: "stable" as const,
    volume: 89,
    condition: "NEAR_MINT",
    currency: "EUR" as const,
  },
  {
    id: "5",
    name: "'71 Datsun 510 - Super",
    series: "2024 Super",
    avgPrice: 4500,
    change: 15.8,
    trend: "up" as const,
    volume: 56,
    condition: "NEAR_MINT",
    currency: "EUR" as const,
  },
  {
    id: "6",
    name: "Tesla Cybertruck",
    series: "2024 Mainline",
    avgPrice: 350,
    change: -8.1,
    trend: "down" as const,
    volume: 234,
    condition: "GOOD",
    currency: "EUR" as const,
  },
];

const recentSales = [
  { item: "'67 Camaro STH - Factory Sealed", price: 38500, condition: "MINT", date: "2026-02-09", source: "Sammelfieber", currency: "EUR" as const },
  { item: "VW Drag Bus - Convention", price: 92000, condition: "MINT", date: "2026-02-09", source: "eBay", currency: "EUR" as const },
  { item: "Porsche 911 GT3 RS - STH", price: 28900, condition: "NEAR_MINT", date: "2026-02-08", source: "Sammelfieber", currency: "EUR" as const },
  { item: "'55 Chevy Bel Air Gasser", price: 11800, condition: "EXCELLENT", date: "2026-02-08", source: "eBay", currency: "EUR" as const },
  { item: "'71 Datsun 510 - Super", price: 4800, condition: "MINT", date: "2026-02-07", source: "Sammelfieber", currency: "EUR" as const },
];

const topCategories = [
  { name: "Super Treasure Hunts", items: 1248, avgValue: 18500, trend: "up" as const },
  { name: "RLC Exclusives", items: 892, avgValue: 12400, trend: "up" as const },
  { name: "Convention Exclusives", items: 456, avgValue: 34200, trend: "stable" as const },
  { name: "Premium Line", items: 3421, avgValue: 1850, trend: "down" as const },
  { name: "Mainline", items: 24567, avgValue: 280, trend: "stable" as const },
  { name: "Car Culture", items: 2134, avgValue: 2100, trend: "up" as const },
];

function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-400" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-400" />;
  return <Minus className="h-4 w-4 text-white/40" />;
}

function PriceGuideContent() {
  const t = useTranslations("priceGuide");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
            {locale === "de" ? "Preisfuhrer" : "Price Guide"}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {locale === "de"
              ? "Echtzeit-Marktwerte basierend auf Verkaufsdaten und Community-Einblicken."
              : "Real-time market values powered by sales data and community insights."}
          </p>
        </div>
        <Button variant="outline">
          <DollarSign className="mr-2 h-4 w-4" />
          {locale === "de" ? "Preis melden" : "Submit Price"}
        </Button>
      </div>

      {/* Search */}
      <div className="mt-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
          <Input
            placeholder={
              locale === "de"
                ? "Sammlerstuck suchen fur Marktwert..."
                : "Search for a collectible to see its market value..."
            }
            className="h-14 pl-12 text-base"
          />
        </div>
      </div>

      {/* Market Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                <BarChart3 className="h-5 w-5 text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-xs text-white/40">
                  {locale === "de" ? "Bewertete Artikel" : "Items Tracked"}
                </p>
                <p className="font-mono text-xl font-bold">52,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">
                  {locale === "de" ? "Verkaufe diese Woche" : "Sales This Week"}
                </p>
                <p className="font-mono text-xl font-bold">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">
                  {locale === "de" ? "Community-Beitrage" : "Community Prices"}
                </p>
                <p className="font-mono text-xl font-bold">8,932</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                <Flame className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">
                  {locale === "de" ? "Markttrend" : "Market Trend"}
                </p>
                <p className="font-mono text-xl font-bold text-green-400">+4.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="trending" className="mt-10">
        <TabsList>
          <TabsTrigger value="trending">
            <Flame className="mr-2 h-4 w-4" />
            {locale === "de" ? "Trending" : "Trending"}
          </TabsTrigger>
          <TabsTrigger value="recent">
            <Clock className="mr-2 h-4 w-4" />
            {locale === "de" ? "Letzte Verkaufe" : "Recent Sales"}
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Star className="mr-2 h-4 w-4" />
            {locale === "de" ? "Kategorien" : "Categories"}
          </TabsTrigger>
        </TabsList>

        {/* Trending Tab */}
        <TabsContent value="trending">
          <div className="mt-6">
            <Card>
              <CardContent className="p-0">
                {/* Table Header */}
                <div className="hidden border-b border-white/5 px-6 py-3 sm:grid sm:grid-cols-12 sm:gap-4">
                  <span className="col-span-5 text-xs font-medium uppercase text-white/30">
                    {locale === "de" ? "Artikel" : "Item"}
                  </span>
                  <span className="col-span-2 text-right text-xs font-medium uppercase text-white/30">
                    {locale === "de" ? "Durchschn." : "Avg. Price"}
                  </span>
                  <span className="col-span-2 text-right text-xs font-medium uppercase text-white/30">
                    {locale === "de" ? "Anderung" : "Change"}
                  </span>
                  <span className="col-span-2 text-right text-xs font-medium uppercase text-white/30">
                    {locale === "de" ? "Volumen" : "Volume"}
                  </span>
                  <span className="col-span-1" />
                </div>

                {trendingItems.map((item, i) => (
                  <div key={item.id}>
                    <Link href={`/price-guide/${item.id}`} className="group">
                      <div className="grid grid-cols-1 gap-2 px-6 py-4 transition-colors hover:bg-white/[0.02] sm:grid-cols-12 sm:items-center sm:gap-4">
                        {/* Item Info */}
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]">
                            <TrendIcon trend={item.trend} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="truncate text-sm font-medium group-hover:text-[var(--color-primary)] transition-colors">
                              {item.name}
                            </h4>
                            <p className="font-mono text-[10px] text-white/30">{item.series}</p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-right">
                          <PriceTag priceCents={item.avgPrice} currency={item.currency} size="sm" />
                        </div>

                        {/* Change */}
                        <div className="col-span-2 text-right">
                          <span
                            className={`font-mono text-sm font-medium ${
                              item.trend === "up"
                                ? "text-green-400"
                                : item.trend === "down"
                                  ? "text-red-400"
                                  : "text-white/40"
                            }`}
                          >
                            {item.change > 0 ? "+" : ""}
                            {item.change}%
                          </span>
                        </div>

                        {/* Volume */}
                        <div className="col-span-2 text-right">
                          <span className="font-mono text-sm text-white/60">
                            {item.volume} {locale === "de" ? "Verk." : "sales"}
                          </span>
                        </div>

                        {/* Arrow */}
                        <div className="col-span-1 text-right">
                          <ChevronRight className="inline h-4 w-4 text-white/20 group-hover:text-[var(--color-primary)] transition-colors" />
                        </div>
                      </div>
                    </Link>
                    {i < trendingItems.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recent Sales Tab */}
        <TabsContent value="recent">
          <div className="mt-6 space-y-3">
            {recentSales.map((sale, i) => (
              <Card key={i} className="group transition-all hover:border-[var(--color-primary)]/20">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="truncate text-sm font-medium">{sale.item}</h4>
                      <ConditionBadge condition={sale.condition} />
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-white/40">
                      <span>
                        {new Date(sale.date).toLocaleDateString(
                          locale === "de" ? "de-DE" : "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </span>
                      <span>&middot;</span>
                      <Badge variant={sale.source === "Sammelfieber" ? "gold" : "secondary"}>
                        {sale.source}
                      </Badge>
                    </div>
                  </div>
                  <PriceTag priceCents={sale.price} currency={sale.currency} size="md" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline">
              {locale === "de" ? "Alle Verkaufe anzeigen" : "View All Sales"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topCategories.map((category) => (
              <Card key={category.name} className="group transition-all hover:border-[var(--color-primary)]/20">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium group-hover:text-[var(--color-primary)] transition-colors">
                        {category.name}
                      </h4>
                      <p className="mt-1 font-mono text-xs text-white/40">
                        {category.items.toLocaleString()} {locale === "de" ? "Artikel" : "items"}
                      </p>
                    </div>
                    <TrendIcon trend={category.trend} />
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase text-white/30">
                        {locale === "de" ? "Durchschn. Wert" : "Avg. Value"}
                      </p>
                      <PriceTag priceCents={category.avgValue} currency="EUR" size="sm" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-[var(--color-primary)]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Community CTA */}
      <section className="mt-16">
        <Card className="overflow-hidden bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent border-[var(--color-primary)]/10">
          <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold">
                {locale === "de"
                  ? "Hilf uns den Preisfuhrer zu verbessern"
                  : "Help Improve the Price Guide"}
              </h3>
              <p className="mt-2 max-w-lg text-sm text-white/60">
                {locale === "de"
                  ? "Melde Preise die du bezahlt oder gesehen hast. Community-Beitrage helfen uns genauere Marktwerte zu berechnen."
                  : "Submit prices you've paid or seen. Community contributions help us calculate more accurate market values."}
              </p>
            </div>
            <Button variant="gold" size="lg">
              <DollarSign className="mr-2 h-4 w-4" />
              {locale === "de" ? "Preis melden" : "Submit a Price"}
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

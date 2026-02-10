import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Separator,
  PriceTag,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@sammelfieber/ui";
import {
  Flame,
  Clock,
  Users,
  Gavel,
  Calendar,
  ArrowRight,
  Timer,
  TrendingUp,
  Bell,
  Zap,
} from "lucide-react";

export default async function AuctionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AuctionsContent />;
}

const liveAuctions = [
  {
    id: "1",
    title: "Super Treasure Hunt Mega Drop",
    lots: 24,
    currentLot: 8,
    currentItem: "'67 Camaro STH - Factory Sealed",
    currentBid: 42500,
    bidCount: 47,
    watchers: 312,
    timeLeft: "2:34",
    currency: "EUR" as const,
    isHot: true,
  },
  {
    id: "2",
    title: "RLC Exclusive Collection",
    lots: 16,
    currentLot: 3,
    currentItem: "'55 Chevy Bel Air Gasser - RLC",
    currentBid: 18900,
    bidCount: 23,
    watchers: 189,
    timeLeft: "5:12",
    currency: "EUR" as const,
    isHot: false,
  },
];

const upcomingAuctions = [
  {
    id: "3",
    title: "Vintage Convention Specials",
    description: "Rare convention exclusives from 2018-2024",
    lots: 32,
    startDate: "2026-02-15T18:00:00Z",
    estimatedValue: 125000,
    registeredBidders: 89,
    currency: "EUR" as const,
    curator: "Sammelfieber Team",
  },
  {
    id: "4",
    title: "JDM Legends Collection",
    description: "Premium Japanese car models - Skyline, Supra, NSX",
    lots: 20,
    startDate: "2026-02-18T20:00:00Z",
    estimatedValue: 45000,
    registeredBidders: 156,
    currency: "EUR" as const,
    curator: "JDM_Dreams",
  },
  {
    id: "5",
    title: "Monthly Premium Drop #14",
    description: "Curated selection of this month's premium finds",
    lots: 48,
    startDate: "2026-02-22T19:00:00Z",
    estimatedValue: 89000,
    registeredBidders: 234,
    currency: "EUR" as const,
    curator: "Sammelfieber Team",
  },
  {
    id: "6",
    title: "European Classics Auction",
    description: "Mercedes, Porsche, BMW - premium European models",
    lots: 28,
    startDate: "2026-02-25T18:00:00Z",
    estimatedValue: 67000,
    registeredBidders: 112,
    currency: "EUR" as const,
    curator: "EuroCollector",
  },
];

const recentResults = [
  { item: "VW Drag Bus - 2022 Convention", soldFor: 94500, currency: "EUR" as const, bids: 67, date: "2026-02-08" },
  { item: "'71 Datsun 510 - RLC Exclusive", soldFor: 15800, currency: "EUR" as const, bids: 34, date: "2026-02-08" },
  { item: "Porsche 911 GT3 RS - STH", soldFor: 28900, currency: "EUR" as const, bids: 52, date: "2026-02-07" },
  { item: "Tesla Cybertruck - Chrome Edition", soldFor: 8500, currency: "EUR" as const, bids: 19, date: "2026-02-07" },
  { item: "'67 Camaro - Red Line Club", soldFor: 38200, currency: "EUR" as const, bids: 41, date: "2026-02-06" },
];

function AuctionsContent() {
  const t = useTranslations("auction");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
              {locale === "de" ? "Auktionen" : "Auctions"}
            </p>
            <Badge variant="live">
              <Flame className="mr-1 h-3 w-3" />
              {locale === "de" ? "2 LIVE" : "2 LIVE"}
            </Badge>
          </div>
          <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {locale === "de"
              ? "Kuratierte Auktions-Drops und Live-Gebote auf seltene Sammlerstucke."
              : "Curated auction drops and live bidding on rare collectibles."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            {locale === "de" ? "Benachrichtigungen" : "Notifications"}
          </Button>
          <Button variant="gold">
            <Calendar className="mr-2 h-4 w-4" />
            {locale === "de" ? "Kalender" : "Calendar"}
          </Button>
        </div>
      </div>

      {/* Live Auctions */}
      {liveAuctions.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
            <h2 className="font-serif text-xl font-bold">
              {locale === "de" ? "Jetzt Live" : "Live Now"}
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {liveAuctions.map((auction) => (
              <Link key={auction.id} href={`/auctions/${auction.id}`} className="group">
                <Card className="overflow-hidden border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent transition-all hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/5">
                  <CardContent className="p-0">
                    {/* Auction Header */}
                    <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="live">LIVE</Badge>
                        <span className="font-mono text-xs text-white/40">
                          {locale === "de" ? "Los" : "Lot"} {auction.currentLot}/{auction.lots}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {auction.watchers}
                        </span>
                        <span className="flex items-center gap-1">
                          <Gavel className="h-3 w-3" /> {auction.bidCount}
                        </span>
                      </div>
                    </div>

                    {/* Current Item */}
                    <div className="flex gap-5 p-6">
                      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]">
                        <Gavel className="h-8 w-8 text-white/10" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                          {auction.title}
                        </p>
                        <h3 className="mt-1 truncate text-lg font-medium group-hover:text-red-400 transition-colors">
                          {auction.currentItem}
                        </h3>
                        <div className="mt-3 flex items-end justify-between">
                          <div>
                            <p className="text-[10px] uppercase text-white/30">
                              {locale === "de" ? "Aktuelles Gebot" : "Current Bid"}
                            </p>
                            <PriceTag priceCents={auction.currentBid} currency={auction.currency} size="lg" />
                          </div>
                          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2">
                            <Timer className="h-4 w-4 text-red-400" />
                            <span className="font-mono text-lg font-bold text-red-400">
                              {auction.timeLeft}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Bid Bar */}
                    <div className="border-t border-white/5 bg-white/[0.02] px-6 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40">
                          {auction.bidCount} {locale === "de" ? "Gebote" : "bids"}
                          {auction.isHot && (
                            <span className="ml-2 text-orange-400">
                              <Flame className="inline h-3 w-3" /> Hot
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] group-hover:underline">
                          {locale === "de" ? "Mitbieten" : "Place Bid"}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Separator className="my-10" />

      {/* Tabs: Upcoming / Results / Calendar */}
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            <Clock className="mr-2 h-4 w-4" />
            {locale === "de" ? "Bevorstehend" : "Upcoming"}
          </TabsTrigger>
          <TabsTrigger value="results">
            <TrendingUp className="mr-2 h-4 w-4" />
            {locale === "de" ? "Ergebnisse" : "Results"}
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="mr-2 h-4 w-4" />
            {locale === "de" ? "Kalender" : "Calendar"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {upcomingAuctions.map((auction) => (
              <Link key={auction.id} href={`/auctions/${auction.id}`} className="group">
                <Card className="overflow-hidden transition-all hover:border-[var(--color-primary)]/20 hover:shadow-lg hover:shadow-[var(--color-primary)]/5">
                  {/* Image Area */}
                  <div className="relative aspect-[21/9] bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gavel className="h-12 w-12 text-white/5" />
                    </div>
                    <div className="absolute left-4 top-4">
                      <Badge variant="gold">
                        {locale === "de" ? "Kuratiert" : "Curated"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                      <span className="font-mono text-xs text-white/80">
                        {auction.lots} {locale === "de" ? "Lose" : "lots"}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-primary)]">
                      {auction.curator}
                    </p>
                    <h3 className="mt-1 text-lg font-medium group-hover:text-[var(--color-primary)] transition-colors">
                      {auction.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/40">
                      {auction.description}
                    </p>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(auction.startDate).toLocaleDateString(
                            locale === "de" ? "de-DE" : "en-US",
                            { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {auction.registeredBidders}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/30">
                          {locale === "de" ? "Geschatzt" : "Est. Value"}
                        </p>
                        <PriceTag priceCents={auction.estimatedValue} currency={auction.currency} size="sm" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="mt-6">
            <Card>
              <CardContent className="p-0">
                {recentResults.map((result, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between px-6 py-4">
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-medium">{result.item}</h4>
                        <p className="mt-0.5 text-xs text-white/40">
                          {new Date(result.date).toLocaleDateString(
                            locale === "de" ? "de-DE" : "en-US",
                            { month: "short", day: "numeric" }
                          )}{" "}
                          &middot; {result.bids} {locale === "de" ? "Gebote" : "bids"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-[10px] text-white/30">
                            {locale === "de" ? "Verkauft fur" : "Sold for"}
                          </p>
                          <PriceTag priceCents={result.soldFor} currency={result.currency} size="sm" />
                        </div>
                        <Zap className="h-4 w-4 text-[var(--color-primary)]" />
                      </div>
                    </div>
                    {i < recentResults.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-[var(--color-card)]/30 p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-white/10" />
            <p className="mt-4 text-sm text-white/40">
              {locale === "de"
                ? "Der vollstandige Auktionskalender wird in Kurze verfugbar sein."
                : "The full auction calendar view is coming soon."}
            </p>
            <Button variant="outline" size="sm" className="mt-4">
              <Bell className="mr-2 h-4 w-4" />
              {locale === "de" ? "Benachrichtigen" : "Notify Me"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* How Auctions Work */}
      <section className="mt-16">
        <h2 className="font-serif text-2xl font-bold">
          {locale === "de" ? "So funktionieren Auktionen" : "How Auctions Work"}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Calendar,
              title: locale === "de" ? "Kuratierte Drops" : "Curated Drops",
              desc: locale === "de"
                ? "Wochentliche Auktions-Events mit sorgfaltig ausgewahlten seltenen Stucken."
                : "Weekly auction events with carefully curated rare items.",
            },
            {
              icon: Zap,
              title: locale === "de" ? "Live-Gebote" : "Live Bidding",
              desc: locale === "de"
                ? "Echtzeit-Gebote mit Anti-Snipe-Schutz und automatischen Geboten."
                : "Real-time bidding with anti-snipe protection and auto-bid.",
            },
            {
              icon: Users,
              title: locale === "de" ? "Verifizierte Bieter" : "Verified Bidders",
              desc: locale === "de"
                ? "Alle Bieter sind verifiziert fur eine sichere Auktionserfahrung."
                : "All bidders are verified for a safe auction experience.",
            },
            {
              icon: TrendingUp,
              title: locale === "de" ? "Faire Preise" : "Fair Prices",
              desc: locale === "de"
                ? "Transparenter Bietverlauf und marktgerechte Startpreise."
                : "Transparent bid history and market-aligned starting prices.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                  <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
                <h3 className="mt-3 text-sm font-medium">{title}</h3>
                <p className="mt-1 text-xs text-white/40">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

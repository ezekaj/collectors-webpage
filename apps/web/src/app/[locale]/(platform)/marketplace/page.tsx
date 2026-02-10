import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Input,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  ConditionBadge,
  PriceTag,
  Separator,
} from "@sammelfieber/ui";
import { Search, SlidersHorizontal, Grid3X3, List, ArrowUpDown, Tag } from "lucide-react";

export default async function MarketplacePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarketplaceContent />;
}

const mockListings = [
  { id: "1", title: "'67 Camaro Super Treasure Hunt", category: "Hot Wheels", year: 2024, condition: "MINT", price: 34500, currency: "EUR" as const, type: "SALE", seller: "HWCollector_DE" },
  { id: "2", title: "Porsche 911 GT3 RS - Mainline", category: "Hot Wheels", year: 2024, condition: "NEAR_MINT", price: 890, currency: "EUR" as const, type: "SALE", seller: "SpeedFreak" },
  { id: "3", title: "'55 Chevy Bel Air Gasser - RLC", category: "Hot Wheels", year: 2023, condition: "MINT", price: 12500, currency: "EUR" as const, type: "SALE", seller: "VintageVault" },
  { id: "4", title: "Nissan Skyline GT-R R34 - Premium", category: "Hot Wheels", year: 2024, condition: "EXCELLENT", price: 2400, currency: "EUR" as const, type: "SALE", seller: "JDM_Dreams" },
  { id: "5", title: "VW Drag Bus - Convention", category: "Hot Wheels", year: 2022, condition: "MINT", price: 89000, currency: "EUR" as const, type: "AUCTION", seller: "RareFinds" },
  { id: "6", title: "'71 Datsun 510 - Super", category: "Hot Wheels", year: 2024, condition: "NEAR_MINT", price: 4500, currency: "EUR" as const, type: "SALE", seller: "DiecastKing" },
  { id: "7", title: "Mercedes-Benz 300 SL - Premium", category: "Hot Wheels", year: 2024, condition: "MINT", price: 1800, currency: "USD" as const, type: "TRADE", seller: "EuroCollector" },
  { id: "8", title: "Tesla Cybertruck - Mainline", category: "Hot Wheels", year: 2024, condition: "GOOD", price: 350, currency: "EUR" as const, type: "SALE", seller: "QuickFlip" },
];

function MarketplaceContent() {
  const t = useTranslations("marketplace");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
            {locale === "de" ? "Marktplatz" : "Marketplace"}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {locale === "de"
              ? "Kaufe und verkaufe Sammlerstucke von verifizierten Handlern weltweit."
              : "Buy and sell collectibles from verified sellers worldwide."}
          </p>
        </div>
        <Button variant="gold">
          <Tag className="mr-2 h-4 w-4" />
          {locale === "de" ? "Anzeige erstellen" : "Create Listing"}
        </Button>
      </div>

      {/* Search + Filters Bar */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input
            placeholder={locale === "de" ? "Sammlerstucke suchen..." : "Search collectibles..."}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="default">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {locale === "de" ? "Filter" : "Filters"}
          </Button>
          <Button variant="outline" size="default">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {locale === "de" ? "Sortieren" : "Sort"}
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          locale === "de" ? "Alle" : "All",
          locale === "de" ? "Verkauf" : "For Sale",
          locale === "de" ? "Auktion" : "Auction",
          locale === "de" ? "Tausch" : "Trade",
        ].map((filter, i) => (
          <button
            key={filter}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              i === 0
                ? "bg-[var(--color-primary)] text-[var(--color-background)]"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
        <Separator orientation="vertical" className="mx-2 h-7" />
        {["Mint", "Near Mint", "Excellent"].map((condition) => (
          <button
            key={condition}
            className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white"
          >
            {condition}
          </button>
        ))}
      </div>

      <Separator className="my-6" />

      {/* Results Count + View Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/40">
          <span className="font-mono font-semibold text-white">{mockListings.length}</span>{" "}
          {locale === "de" ? "Ergebnisse" : "results"}
        </p>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--color-primary)]">
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {mockListings.map((listing) => (
          <Link key={listing.id} href={`/marketplace/${listing.id}`} className="group">
            <Card className="overflow-hidden transition-all hover:border-[var(--color-primary)]/20 hover:shadow-lg hover:shadow-[var(--color-primary)]/5">
              {/* Image */}
              <div className="relative aspect-square bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]">
                <div className="absolute left-3 top-3 flex gap-1.5">
                  {listing.type === "AUCTION" && <Badge variant="live">LIVE</Badge>}
                  {listing.type === "TRADE" && (
                    <Badge variant="secondary">
                      {locale === "de" ? "Tausch" : "Trade"}
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-3 right-3">
                  <ConditionBadge condition={listing.condition} />
                </div>
                {/* Placeholder for item image */}
                <div className="flex h-full items-center justify-center">
                  <span className="font-mono text-xs text-white/10">
                    {listing.category}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                  {listing.category} &middot; {listing.year}
                </p>
                <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                  {listing.title}
                </h3>
                <div className="mt-3 flex items-end justify-between">
                  <PriceTag priceCents={listing.price} currency={listing.currency} size="md" />
                  <p className="text-[10px] text-white/30">{listing.seller}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">
          {locale === "de" ? "Mehr laden" : "Load More"}
        </Button>
      </div>
    </div>
  );
}

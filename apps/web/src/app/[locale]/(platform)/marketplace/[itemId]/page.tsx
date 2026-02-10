import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Separator,
  ConditionBadge,
  GradeBadge,
  PriceTag,
  Avatar,
  AvatarFallback,
} from "@sammelfieber/ui";
import {
  Heart,
  Share2,
  ShoppingCart,
  ArrowLeftRight,
  MessageCircle,
  Shield,
  Truck,
  Clock,
  MapPin,
  Star,
  ChevronLeft,
  Eye,
  Flag,
  Package,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ locale: string; itemId: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ItemDetailContent />;
}

const mockItem = {
  id: "1",
  title: "'67 Camaro Super Treasure Hunt",
  subtitle: "2024 Super Treasure Hunt - Factory Sealed",
  category: "Hot Wheels",
  year: 2024,
  condition: "MINT",
  grade: 9.5,
  price: 34500,
  currency: "EUR" as const,
  type: "SALE" as const,
  seller: {
    name: "HWCollector_DE",
    rating: 4.9,
    reviews: 247,
    sales: 892,
    joined: "2019",
    verified: true,
    location: "Berlin, Germany",
    locationDe: "Berlin, Deutschland",
    responseTime: "< 2h",
  },
  views: 1247,
  watchers: 34,
  listed: "2026-02-05",
  attributes: {
    castingNumber: "DTX82",
    wheelType: "Real Riders",
    baseColor: "Spectraflame Red",
    tampoDetails: "Gold striping, black hood",
    blisterCardType: "International Long Card",
    factoryLocation: "Malaysia",
    isTreasureHunt: false,
    isSuperTreasureHunt: true,
  },
  shipping: [
    { region: "Germany", regionDe: "Deutschland", price: 499, days: "1-3" },
    { region: "Europe", regionDe: "Europa", price: 1299, days: "3-7" },
    { region: "Worldwide", regionDe: "Weltweit", price: 2499, days: "7-14" },
  ],
  priceHistory: {
    avg30d: 32800,
    avg90d: 29500,
    trend: "up" as const,
    trendPercent: 12.5,
  },
  similarItems: [
    { id: "2", title: "'67 Camaro STH - 2023", price: 28900, condition: "NEAR_MINT", currency: "EUR" as const },
    { id: "3", title: "'67 Camaro STH - 2022", price: 22500, condition: "MINT", currency: "EUR" as const },
    { id: "4", title: "'67 Camaro - RLC Exclusive", price: 15800, condition: "MINT", currency: "EUR" as const },
  ],
};

function ItemDetailContent() {
  const t = useTranslations("marketplace");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-white/40">
        <Link href="/marketplace" className="flex items-center gap-1 hover:text-white/60 transition-colors">
          <ChevronLeft className="h-3 w-3" />
          {locale === "de" ? "Marktplatz" : "Marketplace"}
        </Link>
        <span>/</span>
        <span>{mockItem.category}</span>
        <span>/</span>
        <span className="text-white/60">{mockItem.title}</span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Images - 3 cols */}
        <div className="lg:col-span-3">
          {/* Main Image */}
          <Card className="overflow-hidden">
            <div className="relative aspect-square bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]">
              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {mockItem.attributes.isSuperTreasureHunt && (
                  <Badge variant="gold">
                    <Star className="mr-1 h-3 w-3" />
                    Super Treasure Hunt
                  </Badge>
                )}
                <ConditionBadge condition={mockItem.condition} />
              </div>

              {/* Grade */}
              <div className="absolute right-4 top-4">
                <GradeBadge grade={mockItem.grade} size="lg" />
              </div>

              {/* Placeholder */}
              <div className="flex h-full items-center justify-center">
                <span className="font-mono text-sm text-white/10">{mockItem.category}</span>
              </div>

              {/* Quick actions */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm text-white/60 hover:text-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm text-white/60 hover:text-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Thumbnail Strip */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square cursor-pointer rounded-lg transition-all ${
                  i === 0
                    ? "border-2 border-[var(--color-primary)] bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]"
                    : "border border-white/5 bg-[var(--color-card)] opacity-50 hover:opacity-75"
                }`}
              />
            ))}
          </div>

          {/* Item Attributes */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-serif text-lg font-bold">
                {locale === "de" ? "Artikeldetails" : "Item Details"}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  { label: locale === "de" ? "Gussnummer" : "Casting #", value: mockItem.attributes.castingNumber },
                  { label: locale === "de" ? "Radtyp" : "Wheel Type", value: mockItem.attributes.wheelType },
                  { label: locale === "de" ? "Grundfarbe" : "Base Color", value: mockItem.attributes.baseColor },
                  { label: "Tampo", value: mockItem.attributes.tampoDetails },
                  { label: locale === "de" ? "Kartentyp" : "Card Type", value: mockItem.attributes.blisterCardType },
                  { label: locale === "de" ? "Fabrikstandort" : "Factory", value: mockItem.attributes.factoryLocation },
                  { label: locale === "de" ? "Jahr" : "Year", value: String(mockItem.year) },
                  { label: locale === "de" ? "Kategorie" : "Category", value: mockItem.category },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] uppercase text-white/30">{label}</p>
                    <p className="mt-0.5 text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price History */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold">
                  {locale === "de" ? "Preisverlauf" : "Price History"}
                </h3>
                <Link href={`/price-guide/${mockItem.id}`} className="text-xs text-[var(--color-primary)] hover:underline">
                  {locale === "de" ? "Vollstandiger Guide" : "Full Guide"}
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "30-Tage Durchschn." : "30d Avg."}
                  </p>
                  <PriceTag priceCents={mockItem.priceHistory.avg30d} currency="EUR" size="sm" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "90-Tage Durchschn." : "90d Avg."}
                  </p>
                  <PriceTag priceCents={mockItem.priceHistory.avg90d} currency="EUR" size="sm" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-white/30">Trend</p>
                  <div className="mt-0.5 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="font-mono text-sm font-bold text-green-400">
                      +{mockItem.priceHistory.trendPercent}%
                    </span>
                  </div>
                </div>
              </div>
              {/* Chart placeholder */}
              <div className="mt-4 h-32 rounded-lg bg-gradient-to-r from-green-500/5 to-transparent border border-white/5 flex items-center justify-center">
                <span className="text-xs text-white/20">
                  {locale === "de" ? "Preischart wird geladen..." : "Price chart loading..."}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchase / Info Sidebar - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Purchase Card */}
          <Card className="sticky top-20">
            <CardContent className="p-6">
              {/* Title */}
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-primary)]">
                {mockItem.category} &middot; {mockItem.year}
              </p>
              <h1 className="mt-2 font-serif text-2xl font-bold leading-tight">
                {mockItem.title}
              </h1>
              <p className="mt-1 text-sm text-white/40">{mockItem.subtitle}</p>

              <Separator className="my-5" />

              {/* Price */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "Preis" : "Price"}
                  </p>
                  <PriceTag priceCents={mockItem.price} currency={mockItem.currency} size="lg" />
                </div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>
                    {locale === "de" ? "Unter Marktwert" : "Below market"}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 space-y-3">
                <Button variant="gold" size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {locale === "de" ? "Jetzt kaufen" : "Buy Now"}
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {locale === "de" ? "Angebot" : "Make Offer"}
                  </Button>
                  <Button variant="outline">
                    <ArrowLeftRight className="mr-2 h-4 w-4" />
                    {locale === "de" ? "Tauschen" : "Trade"}
                  </Button>
                </div>
              </div>

              <Separator className="my-5" />

              {/* Shipping */}
              <div>
                <h4 className="flex items-center gap-2 text-xs font-medium">
                  <Truck className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                  {locale === "de" ? "Versand" : "Shipping"}
                </h4>
                <div className="mt-3 space-y-2">
                  {mockItem.shipping.map((option) => (
                    <div key={option.region} className="flex items-center justify-between text-xs">
                      <span className="text-white/60">
                        {locale === "de" ? option.regionDe : option.region}
                      </span>
                      <div className="flex items-center gap-2">
                        <PriceTag priceCents={option.price} currency="EUR" size="sm" />
                        <span className="text-white/30">
                          ({option.days} {locale === "de" ? "Tage" : "days"})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-5" />

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <Shield className="mx-auto h-5 w-5 text-green-400" />
                  <p className="mt-1 text-[10px] text-white/40">
                    {locale === "de" ? "Kauferschutz" : "Buyer Protection"}
                  </p>
                </div>
                <div>
                  <CheckCircle2 className="mx-auto h-5 w-5 text-blue-400" />
                  <p className="mt-1 text-[10px] text-white/40">
                    {locale === "de" ? "Verifiziert" : "Verified"}
                  </p>
                </div>
                <div>
                  <Package className="mx-auto h-5 w-5 text-[var(--color-primary)]" />
                  <p className="mt-1 text-[10px] text-white/40">
                    {locale === "de" ? "Versichert" : "Insured"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seller Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {mockItem.seller.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{mockItem.seller.name}</h4>
                    {mockItem.seller.verified && (
                      <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-[var(--color-primary)]" />
                      {mockItem.seller.rating}
                    </span>
                    <span>({mockItem.seller.reviews} {locale === "de" ? "Bewertungen" : "reviews"})</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-white/[0.02] p-2 text-center">
                  <p className="font-mono text-sm font-bold">{mockItem.seller.sales}</p>
                  <p className="text-[10px] text-white/30">
                    {locale === "de" ? "Verkaufe" : "Sales"}
                  </p>
                </div>
                <div className="rounded-lg bg-white/[0.02] p-2 text-center">
                  <p className="font-mono text-sm font-bold">{mockItem.seller.responseTime}</p>
                  <p className="text-[10px] text-white/30">
                    {locale === "de" ? "Antwort" : "Response"}
                  </p>
                </div>
                <div className="rounded-lg bg-white/[0.02] p-2 text-center">
                  <p className="font-mono text-sm font-bold">{mockItem.seller.joined}</p>
                  <p className="text-[10px] text-white/30">
                    {locale === "de" ? "Beigetreten" : "Joined"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                <MapPin className="h-3 w-3" />
                {locale === "de" ? mockItem.seller.locationDe : mockItem.seller.location}
              </div>

              <Button variant="outline" className="mt-4 w-full" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                {locale === "de" ? "Verkaufer kontaktieren" : "Contact Seller"}
              </Button>
            </CardContent>
          </Card>

          {/* Item Stats */}
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {mockItem.views} {locale === "de" ? "Aufrufe" : "views"}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" />
                  {mockItem.watchers} {locale === "de" ? "Beobachter" : "watchers"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Clock className="h-3.5 w-3.5" />
                {locale === "de" ? "Eingestellt am" : "Listed"}{" "}
                {new Date(mockItem.listed).toLocaleDateString(
                  locale === "de" ? "de-DE" : "en-US",
                  { month: "short", day: "numeric" }
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar Items */}
      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold">
            {locale === "de" ? "Ahnliche Artikel" : "Similar Items"}
          </h2>
          <Link href="/marketplace" className="text-xs text-[var(--color-primary)] hover:underline">
            {locale === "de" ? "Alle anzeigen" : "View All"}
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {mockItem.similarItems.map((item) => (
            <Link key={item.id} href={`/marketplace/${item.id}`} className="group">
              <Card className="overflow-hidden transition-all hover:border-[var(--color-primary)]/20">
                <div className="aspect-square bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]">
                  <div className="flex h-full items-center justify-center">
                    <span className="font-mono text-xs text-white/10">Hot Wheels</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="truncate text-sm font-medium group-hover:text-[var(--color-primary)] transition-colors">
                    {item.title}
                  </h4>
                  <div className="mt-2 flex items-center justify-between">
                    <PriceTag priceCents={item.price} currency={item.currency} size="sm" />
                    <ConditionBadge condition={item.condition} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Report */}
      <div className="mt-12 text-center">
        <button className="inline-flex items-center gap-1 text-xs text-white/20 hover:text-white/40 transition-colors">
          <Flag className="h-3 w-3" />
          {locale === "de" ? "Anzeige melden" : "Report Listing"}
        </button>
      </div>
    </div>
  );
}

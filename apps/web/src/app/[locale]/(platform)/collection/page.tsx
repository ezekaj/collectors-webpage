import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ConditionBadge,
  PriceTag,
  GradeBadge,
  Separator,
  Badge,
} from "@sammelfieber/ui";
import {
  Plus,
  Heart,
  TrendingUp,
  Package,
  BarChart3,
  Grid3X3,
  BookOpen,
  Camera,
} from "lucide-react";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CollectionContent />;
}

const mockItems = [
  { id: "1", name: "'67 Camaro STH", series: "2024 Super Treasure Hunt", condition: "MINT", grade: 9.5, value: 34500, currency: "EUR" as const },
  { id: "2", name: "Porsche 911 GT3 RS", series: "2024 Mainline", condition: "NEAR_MINT", grade: 8.5, value: 890, currency: "EUR" as const },
  { id: "3", name: "'55 Chevy Bel Air Gasser", series: "2023 RLC Exclusive", condition: "MINT", grade: 9.8, value: 12500, currency: "EUR" as const },
  { id: "4", name: "Nissan Skyline GT-R R34", series: "2024 Premium", condition: "EXCELLENT", grade: 7.5, value: 2400, currency: "EUR" as const },
  { id: "5", name: "'71 Datsun 510", series: "2024 Super", condition: "NEAR_MINT", grade: 9.0, value: 4500, currency: "EUR" as const },
  { id: "6", name: "Mercedes-Benz 300 SL", series: "2024 Premium", condition: "MINT", grade: 9.2, value: 1800, currency: "EUR" as const },
];

function CollectionContent() {
  const t = useTranslations("collection");
  const locale = useLocale();

  const totalValue = mockItems.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
            {locale === "de" ? "Meine Sammlung" : "My Collection"}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href="/grade">
            <Button variant="outline">
              <Camera className="mr-2 h-4 w-4" />
              {locale === "de" ? "Bewerten" : "Grade"}
            </Button>
          </Link>
          <Button variant="gold">
            <Plus className="mr-2 h-4 w-4" />
            {t("addItem")}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                <TrendingUp className="h-5 w-5 text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-xs text-white/40">{t("totalValue")}</p>
                <PriceTag priceCents={totalValue} currency="EUR" size="md" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Package className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">{t("itemCount")}</p>
                <p className="font-mono text-xl font-bold">{mockItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10">
                <Heart className="h-5 w-5 text-pink-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">{t("wishlist")}</p>
                <p className="font-mono text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <BarChart3 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">
                  {locale === "de" ? "Bewertungen" : "Gradings"}
                </p>
                <p className="font-mono text-xl font-bold">{mockItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="items" className="mt-10">
        <TabsList>
          <TabsTrigger value="items">
            <Grid3X3 className="mr-2 h-4 w-4" />
            {locale === "de" ? "Sammlung" : "Collection"}
          </TabsTrigger>
          <TabsTrigger value="wishlist">
            <Heart className="mr-2 h-4 w-4" />
            {t("wishlist")}
          </TabsTrigger>
          <TabsTrigger value="catalogue">
            <BookOpen className="mr-2 h-4 w-4" />
            {locale === "de" ? "Katalog" : "Catalogue"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden transition-all hover:border-[var(--color-primary)]/20">
                <div className="flex gap-4 p-4">
                  {/* Image placeholder */}
                  <div className="h-20 w-20 shrink-0 rounded-lg bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)] flex items-center justify-center">
                    <GradeBadge grade={item.grade} size="sm" />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                      {item.series}
                    </p>
                    <h3 className="mt-1 truncate text-sm font-medium group-hover:text-[var(--color-primary)] transition-colors">
                      {item.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <ConditionBadge condition={item.condition} />
                    </div>
                    <div className="mt-2">
                      <PriceTag priceCents={item.value} currency={item.currency} size="sm" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wishlist">
          <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-[var(--color-card)]/30 p-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-white/10" />
            <p className="mt-4 text-sm text-white/40">
              {locale === "de"
                ? "Setze Sammlerstucke auf deine Wunschliste um benachrichtigt zu werden."
                : "Add collectibles to your wishlist to get notified when they become available."}
            </p>
            <Link href="/marketplace" className="mt-4 inline-block">
              <Button variant="outline" size="sm">
                {locale === "de" ? "Marktplatz durchsuchen" : "Browse Marketplace"}
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="catalogue">
          <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-[var(--color-card)]/30 p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-white/10" />
            <p className="mt-4 text-sm text-white/40">
              {locale === "de"
                ? "Offne den interaktiven Katalog um deinen Fortschritt zu sehen."
                : "Open the interactive catalogue to track your collection progress."}
            </p>
            <Link href="/catalogue" className="mt-4 inline-block">
              <Button variant="gold" size="sm">
                {locale === "de" ? "Katalog offnen" : "Open Catalogue"}
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

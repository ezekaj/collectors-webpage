import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Separator,
  GradeBadge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@sammelfieber/ui";
import {
  BookOpen,
  Camera,
  ScanBarcode,
  Search,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Star,
  Lock,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";

export default async function CataloguePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CatalogueContent />;
}

const catalogueSeries = [
  { id: "1", name: "2024 Super Treasure Hunts", total: 15, collected: 4, year: 2024 },
  { id: "2", name: "2024 Mainline", total: 250, collected: 23, year: 2024 },
  { id: "3", name: "2024 Premium - Fast & Furious", total: 5, collected: 3, year: 2024 },
  { id: "4", name: "2024 Car Culture - Speed Machines", total: 5, collected: 2, year: 2024 },
  { id: "5", name: "2023 RLC Exclusives", total: 12, collected: 5, year: 2023 },
  { id: "6", name: "2024 Convention Exclusives", total: 8, collected: 1, year: 2024 },
];

const currentPageSlots = [
  { position: 1, item: { name: "'67 Camaro STH", grade: 9.5 }, collected: true },
  { position: 2, item: { name: "Porsche 911 GT3 RS STH", grade: 8.5 }, collected: true },
  { position: 3, item: { name: "Nissan Skyline GTR STH" }, collected: false },
  { position: 4, item: { name: "'71 Datsun 510 STH", grade: 9.0 }, collected: true },
  { position: 5, item: { name: "Ford Mustang Boss 302 STH" }, collected: false },
  { position: 6, item: { name: "Corvette C8 STH" }, collected: false },
  { position: 7, item: { name: "Toyota Supra STH", grade: 9.2 }, collected: true },
  { position: 8, item: { name: "Dodge Challenger STH" }, collected: false },
  { position: 9, item: { name: "BMW M3 STH" }, collected: false },
  { position: 10, item: { name: "Lamborghini Huracan STH" }, collected: false },
  { position: 11, item: { name: "McLaren 720S STH" }, collected: false },
  { position: 12, item: { name: "Ferrari 488 STH" }, collected: false },
];

const achievements = [
  { name: "First Catch", desc: "Collect your first item", unlocked: true, icon: Star },
  { name: "Treasure Hunter", desc: "Find a Super Treasure Hunt", unlocked: true, icon: Sparkles },
  { name: "Sharp Eye", desc: "Grade 10 items", unlocked: false, icon: Target },
  { name: "Completionist", desc: "Complete a full series page", unlocked: false, icon: Trophy },
];

function CatalogueContent() {
  const t = useTranslations("catalogue");
  const locale = useLocale();

  const totalCollected = catalogueSeries.reduce((sum, s) => sum + s.collected, 0);
  const totalItems = catalogueSeries.reduce((sum, s) => sum + s.total, 0);
  const progressPercent = Math.round((totalCollected / totalItems) * 100);
  const currentPageCollected = currentPageSlots.filter((s) => s.collected).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
            {locale === "de" ? "Digitaler Katalog" : "Digital Catalogue"}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {locale === "de"
              ? "Dein interaktives Sammleralbum. Scanne, sammle und vervollstandige deine Serien."
              : "Your interactive sticker book. Scan, collect, and complete your series."}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/grade">
            <Button variant="outline">
              <Camera className="mr-2 h-4 w-4" />
              {locale === "de" ? "Scannen" : "Scan"}
            </Button>
          </Link>
          <Button variant="gold">
            <ScanBarcode className="mr-2 h-4 w-4" />
            {locale === "de" ? "Barcode" : "Barcode"}
          </Button>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-white/40">
                {locale === "de" ? "Gesamtfortschritt" : "Overall Progress"}
              </p>
              <p className="mt-1 font-mono text-2xl font-bold">
                {totalCollected}
                <span className="text-white/30">/{totalItems}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[var(--color-primary)]" />
                <span className="font-mono text-sm font-bold">1,250 XP</span>
              </div>
              <Badge variant="gold">
                {locale === "de" ? "Level 4" : "Level 4"}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/40">
              <span>{progressPercent}% {locale === "de" ? "komplett" : "complete"}</span>
              <span>
                {totalItems - totalCollected} {locale === "de" ? "ubrig" : "remaining"}
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/60 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="book" className="mt-10">
        <TabsList>
          <TabsTrigger value="book">
            <BookOpen className="mr-2 h-4 w-4" />
            {locale === "de" ? "Album" : "Sticker Book"}
          </TabsTrigger>
          <TabsTrigger value="series">
            <Search className="mr-2 h-4 w-4" />
            {locale === "de" ? "Serien" : "Series"}
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Trophy className="mr-2 h-4 w-4" />
            {locale === "de" ? "Erfolge" : "Achievements"}
          </TabsTrigger>
        </TabsList>

        {/* Sticker Book Tab */}
        <TabsContent value="book">
          <div className="mt-6">
            {/* Page Navigation */}
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="mr-1 h-4 w-4" />
                {locale === "de" ? "Vorherige" : "Previous"}
              </Button>
              <div className="text-center">
                <p className="font-serif text-lg font-bold">2024 Super Treasure Hunts</p>
                <p className="font-mono text-xs text-white/40">
                  {locale === "de" ? "Seite" : "Page"} 1/2 &middot; {currentPageCollected}/
                  {currentPageSlots.length} {locale === "de" ? "gesammelt" : "collected"}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                {locale === "de" ? "Nachste" : "Next"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            {/* Sticker Book Page */}
            <div className="mx-auto mt-6 max-w-4xl rounded-2xl border-2 border-white/10 bg-gradient-to-br from-[var(--color-card)] via-[var(--color-card-elevated)] to-[var(--color-card)] p-6 shadow-2xl sm:p-10">
              {/* Page texture overlay */}
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-6">
                {currentPageSlots.map((slot) => (
                  <div
                    key={slot.position}
                    className={`group relative aspect-square rounded-xl border-2 transition-all ${
                      slot.collected
                        ? "border-[var(--color-primary)]/30 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent shadow-inner"
                        : "border-dashed border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    {slot.collected ? (
                      <div className="flex h-full flex-col items-center justify-center p-2">
                        <GradeBadge grade={slot.item.grade!} size="sm" />
                        <p className="mt-2 text-center text-[10px] font-medium leading-tight">
                          {slot.item.name}
                        </p>
                      </div>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center p-2">
                        <div className="rounded-full bg-white/5 p-2">
                          <Lock className="h-4 w-4 text-white/10" />
                        </div>
                        <p className="mt-2 text-center text-[9px] text-white/20 leading-tight">
                          {slot.item.name}
                        </p>
                        <p className="mt-1 font-mono text-[8px] text-white/10">#{slot.position}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Page Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-white/30">
                {locale === "de"
                  ? "Tippe auf einen leeren Slot oder scanne einen Barcode um deine Sammlung zu erweitern."
                  : "Tap an empty slot or scan a barcode to add to your collection."}
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Series Tab */}
        <TabsContent value="series">
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catalogueSeries.map((series) => {
              const pct = Math.round((series.collected / series.total) * 100);
              return (
                <Card key={series.id} className="group transition-all hover:border-[var(--color-primary)]/20">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant={pct === 100 ? "gold" : "secondary"}>
                          {series.year}
                        </Badge>
                        <h4 className="mt-2 text-sm font-medium group-hover:text-[var(--color-primary)] transition-colors">
                          {series.name}
                        </h4>
                      </div>
                      <span className="font-mono text-2xl font-bold text-white/20">
                        {pct}%
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-white/40">
                        <span>
                          {series.collected}/{series.total}
                        </span>
                        <span>
                          {series.total - series.collected} {locale === "de" ? "ubrig" : "left"}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-[var(--color-primary)] transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card
                  key={achievement.name}
                  className={`transition-all ${
                    achievement.unlocked
                      ? "border-[var(--color-primary)]/20"
                      : "opacity-50"
                  }`}
                >
                  <CardContent className="flex items-center gap-4 p-5">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                        achievement.unlocked
                          ? "bg-[var(--color-primary)]/10"
                          : "bg-white/5"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          achievement.unlocked
                            ? "text-[var(--color-primary)]"
                            : "text-white/20"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{achievement.name}</h4>
                        {achievement.unlocked && (
                          <Badge variant="gold" className="text-[10px]">
                            {locale === "de" ? "Freigeschaltet" : "Unlocked"}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-white/40">{achievement.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Separator className="my-8" />

          <div className="text-center">
            <p className="text-sm text-white/40">
              {locale === "de"
                ? "Sammle weiter um mehr Erfolge freizuschalten!"
                : "Keep collecting to unlock more achievements!"}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

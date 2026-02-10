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
  ConditionBadge,
} from "@sammelfieber/ui";
import {
  Camera,
  Upload,
  RotateCcw,
  CheckCircle2,
  Circle,
  Sparkles,
  Shield,
  Eye,
  Zap,
  Clock,
  ArrowRight,
  History,
  Info,
} from "lucide-react";

export default async function GradePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GradeContent />;
}

const gradingSteps = [
  { key: "top", angle: "TOP", icon: "1" },
  { key: "left", angle: "LEFT SIDE", icon: "2" },
  { key: "right", angle: "RIGHT SIDE", icon: "3" },
  { key: "bottom", angle: "BOTTOM/BASE", icon: "4" },
  { key: "cardFront", angle: "CARD FRONT", icon: "5", optional: true },
  { key: "cardBack", angle: "CARD BACK", icon: "6", optional: true },
];

const recentGradings = [
  { name: "'67 Camaro STH", date: "2026-02-09", grade: 9.5, condition: "MINT", confidence: 0.94 },
  { name: "Porsche 911 GT3 RS", date: "2026-02-08", grade: 8.5, condition: "NEAR_MINT", confidence: 0.89 },
  { name: "'71 Datsun 510", date: "2026-02-07", grade: 9.0, condition: "NEAR_MINT", confidence: 0.92 },
  { name: "Toyota Supra STH", date: "2026-02-06", grade: 9.2, condition: "MINT", confidence: 0.96 },
];

const gradingScale = [
  { grade: "10", letter: "GM", label: "Gem Mint", color: "text-emerald-400" },
  { grade: "9.5", letter: "M", label: "Mint", color: "text-emerald-400" },
  { grade: "9.0", letter: "NM/M", label: "Near Mint/Mint", color: "text-green-400" },
  { grade: "8.5", letter: "NM", label: "Near Mint", color: "text-green-400" },
  { grade: "7.5-8.0", letter: "E", label: "Excellent", color: "text-yellow-400" },
  { grade: "6.0-7.0", letter: "VG", label: "Very Good", color: "text-orange-400" },
  { grade: "4.0-5.5", letter: "G", label: "Good", color: "text-orange-400" },
  { grade: "2.0-3.5", letter: "F", label: "Fair", color: "text-red-400" },
  { grade: "1.0-1.5", letter: "P", label: "Poor", color: "text-red-400" },
];

function GradeContent() {
  const t = useTranslations("grading");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
              {locale === "de" ? "KI-Bewertung" : "AI Grading"}
            </p>
            <Badge variant="gold">
              <Sparkles className="mr-1 h-3 w-3" />
              {locale === "de" ? "KI-gestutz" : "AI-Powered"}
            </Badge>
          </div>
          <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {locale === "de"
              ? "Fotografiere dein Sammlerstuck und erhalte eine professionelle Zustandsbewertung in Sekunden."
              : "Photograph your collectible and receive a professional condition grade in seconds."}
          </p>
        </div>
        <Link href="/collection">
          <Button variant="outline">
            <History className="mr-2 h-4 w-4" />
            {locale === "de" ? "Verlauf" : "History"}
          </Button>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Camera / Upload Area - 2 cols */}
        <div className="lg:col-span-2">
          {/* Camera Preview */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square max-h-[500px] w-full bg-gradient-to-br from-[var(--color-card-elevated)] to-[var(--color-card)]">
                {/* Camera overlay guides */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Viewfinder corners */}
                  <div className="relative h-64 w-64 sm:h-80 sm:w-80">
                    <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[var(--color-primary)]" />
                    <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[var(--color-primary)]" />
                    <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[var(--color-primary)]" />
                    <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[var(--color-primary)]" />

                    <div className="flex h-full flex-col items-center justify-center">
                      <div className="rounded-full bg-white/5 p-6">
                        <Camera className="h-12 w-12 text-white/20" />
                      </div>
                      <p className="mt-4 text-sm text-white/40">
                        {locale === "de"
                          ? "Kamerazugang erforderlich"
                          : "Camera access required"}
                      </p>
                      <p className="mt-1 text-xs text-white/20">
                        {locale === "de"
                          ? "Platziere das Auto auf einer hellen, ebenen Flache"
                          : "Place the car on a light, flat surface"}
                      </p>
                    </div>
                  </div>

                  {/* Quality indicators */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-green-400">
                        <CheckCircle2 className="h-3 w-3" />
                        {locale === "de" ? "Beleuchtung" : "Lighting"}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Circle className="h-3 w-3" />
                        {locale === "de" ? "Scharfe" : "Focus"}
                      </span>
                      <span className="flex items-center gap-1 text-white/40">
                        <Circle className="h-3 w-3" />
                        {locale === "de" ? "Erkennung" : "Detection"}
                      </span>
                    </div>
                    <Badge variant="secondary">
                      TOP
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 border-t border-white/5 p-6">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                  <Upload className="h-5 w-5" />
                </Button>
                <Button variant="gold" size="xl" className="h-16 w-16 rounded-full">
                  <Camera className="h-7 w-7" />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Capture Steps */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {gradingSteps.map((step, i) => (
              <div
                key={step.key}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                  i === 0
                    ? "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-bold ${
                    i === 0
                      ? "bg-[var(--color-primary)] text-[var(--color-background)]"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {step.icon}
                </div>
                <p className="text-center text-[10px] font-medium text-white/60">
                  {step.angle}
                </p>
                {step.optional && (
                  <p className="text-[8px] text-white/20">
                    {locale === "de" ? "Optional" : "Optional"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* How It Works */}
          <Card>
            <CardContent className="p-5">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Info className="h-4 w-4 text-[var(--color-primary)]" />
                {locale === "de" ? "So funktioniert es" : "How It Works"}
              </h3>
              <div className="mt-4 space-y-4">
                {[
                  {
                    icon: Camera,
                    title: locale === "de" ? "Fotografieren" : "Capture Photos",
                    desc: locale === "de"
                      ? "Mache 4-6 Fotos aus verschiedenen Winkeln."
                      : "Take 4-6 photos from different angles.",
                  },
                  {
                    icon: Sparkles,
                    title: locale === "de" ? "KI-Analyse" : "AI Analysis",
                    desc: locale === "de"
                      ? "Unsere KI erkennt und bewertet den Zustand."
                      : "Our AI identifies and grades the condition.",
                  },
                  {
                    icon: Shield,
                    title: locale === "de" ? "Ergebnis" : "Get Results",
                    desc: locale === "de"
                      ? "Erhalte Note, Zustand und Mangelliste."
                      : "Receive grade, condition, and defect report.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                      <Icon className="h-4 w-4 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{title}</p>
                      <p className="text-[11px] text-white/40">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-medium">
                {locale === "de" ? "Bewertungsstatistik" : "Grading Stats"}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "Genauigkeit" : "Accuracy"}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold text-green-400">94.2%</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "Geschwindigkeit" : "Speed"}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    <Zap className="h-4 w-4 text-[var(--color-primary)]" />
                    <span className="font-mono text-lg font-bold">8-15s</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "Bewertungen" : "Gradings"}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold">12,847</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-white/30">
                    {locale === "de" ? "Modell" : "Model"}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold">v2.1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Gradings */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  {locale === "de" ? "Letzte Bewertungen" : "Recent Gradings"}
                </h3>
                <Link href="/collection" className="text-xs text-[var(--color-primary)] hover:underline">
                  {locale === "de" ? "Alle" : "View All"}
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {recentGradings.map((grading, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <GradeBadge grade={grading.grade} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{grading.name}</p>
                      <div className="flex items-center gap-2">
                        <ConditionBadge condition={grading.condition} />
                        <span className="text-[10px] text-white/30">
                          {Math.round(grading.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Grading Scale Reference */}
      <section className="mt-16">
        <h2 className="font-serif text-2xl font-bold">
          {locale === "de" ? "Bewertungsskala" : "Grading Scale"}
        </h2>
        <p className="mt-2 text-sm text-white/40">
          {locale === "de"
            ? "Hot Wheels Standard-Bewertungsskala fur Sammlerstucke."
            : "Hot Wheels standard grading scale for collectibles."}
        </p>
        <div className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="hidden grid-cols-4 gap-4 border-b border-white/5 px-6 py-3 sm:grid">
                <span className="text-xs font-medium uppercase text-white/30">
                  {locale === "de" ? "Note" : "Grade"}
                </span>
                <span className="text-xs font-medium uppercase text-white/30">
                  {locale === "de" ? "Buchstabe" : "Letter"}
                </span>
                <span className="col-span-2 text-xs font-medium uppercase text-white/30">
                  {locale === "de" ? "Beschreibung" : "Description"}
                </span>
              </div>
              {gradingScale.map((row, i) => (
                <div key={row.grade}>
                  <div className="grid grid-cols-2 gap-4 px-6 py-3 sm:grid-cols-4">
                    <span className={`font-mono text-sm font-bold ${row.color}`}>
                      {row.grade}
                    </span>
                    <span className="font-mono text-sm text-white/60">{row.letter}</span>
                    <span className="col-span-2 text-sm text-white/40 sm:col-span-2">
                      {row.label}
                    </span>
                  </div>
                  {i < gradingScale.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

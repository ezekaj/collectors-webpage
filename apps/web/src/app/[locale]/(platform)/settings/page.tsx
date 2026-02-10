import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Separator,
  Avatar,
  AvatarFallback,
} from "@sammelfieber/ui";
import {
  User,
  Bell,
  Globe,
  Shield,
  CreditCard,
  Package,
  Palette,
  Eye,
  Mail,
  Smartphone,
  ChevronRight,
  LogOut,
} from "lucide-react";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SettingsContent />;
}

const settingsSections = [
  {
    key: "notifications",
    icon: Bell,
    settings: [
      { key: "priceAlerts", default: true },
      { key: "auctionUpdates", default: true },
      { key: "newListings", default: false },
      { key: "communityMentions", default: true },
      { key: "newsletter", default: true },
    ],
  },
  {
    key: "privacy",
    icon: Eye,
    settings: [
      { key: "publicProfile", default: true },
      { key: "showCollection", default: true },
      { key: "showActivity", default: false },
    ],
  },
];

function SettingsContent() {
  const t = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
          {locale === "de" ? "Einstellungen" : "Settings"}
        </p>
        <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight">
          {t("settings")}
        </h1>
      </div>

      {/* Profile Section */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">EZ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium">Elvi Zekaj</h2>
                <Badge variant="gold">
                  {locale === "de" ? "Level 4" : "Level 4"}
                </Badge>
              </div>
              <p className="text-sm text-white/40">@ezekaj</p>
              <p className="mt-1 text-xs text-white/30">
                {locale === "de"
                  ? "Mitglied seit Februar 2026"
                  : "Member since February 2026"}
              </p>
            </div>
            <Button variant="outline" size="sm">
              {locale === "de" ? "Foto andern" : "Change Photo"}
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-white/60">
                {locale === "de" ? "Anzeigename" : "Display Name"}
              </label>
              <Input defaultValue="Elvi Zekaj" className="mt-1.5" />
            </div>
            <div>
              <label className="text-xs font-medium text-white/60">
                {locale === "de" ? "Benutzername" : "Username"}
              </label>
              <Input defaultValue="ezekaj" className="mt-1.5" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-white/60">
                Bio
              </label>
              <Input
                defaultValue={
                  locale === "de"
                    ? "Hot Wheels Sammler aus Deutschland"
                    : "Hot Wheels collector from Germany"
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-white/60">
                {locale === "de" ? "Standort" : "Location"}
              </label>
              <Input
                defaultValue={locale === "de" ? "Deutschland" : "Germany"}
                className="mt-1.5"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-white/60">
                {locale === "de" ? "Webseite" : "Website"}
              </label>
              <Input placeholder="https://" className="mt-1.5" />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="gold">
              {locale === "de" ? "Profil speichern" : "Save Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4 text-[var(--color-primary)]" />
            {locale === "de" ? "Einstellungen" : "Preferences"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          {/* Language */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                {locale === "de" ? "Sprache" : "Language"}
              </p>
              <p className="text-xs text-white/40">
                {locale === "de"
                  ? "Wahle deine bevorzugte Sprache"
                  : "Choose your preferred language"}
              </p>
            </div>
            <div className="flex gap-1 rounded-lg border border-white/10 p-1">
              <button
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  locale === "de"
                    ? "bg-[var(--color-primary)] text-[var(--color-background)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Deutsch
              </button>
              <button
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  locale === "en"
                    ? "bg-[var(--color-primary)] text-[var(--color-background)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                English
              </button>
            </div>
          </div>

          <Separator />

          {/* Currency */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                {locale === "de" ? "Wahrung" : "Currency"}
              </p>
              <p className="text-xs text-white/40">
                {locale === "de"
                  ? "Anzeigewahrung fur Preise"
                  : "Display currency for prices"}
              </p>
            </div>
            <div className="flex gap-1 rounded-lg border border-white/10 p-1">
              <button className="rounded-md bg-[var(--color-primary)] px-3 py-1.5 text-xs font-medium text-[var(--color-background)]">
                EUR
              </button>
              <button className="rounded-md px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white">
                USD
              </button>
            </div>
          </div>

          <Separator />

          {/* Theme */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                {locale === "de" ? "Design" : "Theme"}
              </p>
              <p className="text-xs text-white/40">
                {locale === "de"
                  ? "Erscheinungsbild der Anwendung"
                  : "Application appearance"}
              </p>
            </div>
            <div className="flex gap-1 rounded-lg border border-white/10 p-1">
              <button className="rounded-md bg-[var(--color-primary)] px-3 py-1.5 text-xs font-medium text-[var(--color-background)]">
                Dark
              </button>
              <button className="rounded-md px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white">
                Light
              </button>
              <button className="rounded-md px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white">
                System
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-[var(--color-primary)]" />
            {locale === "de" ? "Benachrichtigungen" : "Notifications"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {[
            {
              label: locale === "de" ? "Preisalarme" : "Price Alerts",
              desc: locale === "de"
                ? "Benachrichtigung wenn Artikel unter deinen Schwellenwert fallen"
                : "Get notified when items drop below your threshold",
              default: true,
            },
            {
              label: locale === "de" ? "Auktions-Updates" : "Auction Updates",
              desc: locale === "de"
                ? "Erinnerungen fur kommende und laufende Auktionen"
                : "Reminders for upcoming and live auctions",
              default: true,
            },
            {
              label: locale === "de" ? "Neue Angebote" : "New Listings",
              desc: locale === "de"
                ? "Benachrichtigung bei neuen Angeboten auf deiner Wunschliste"
                : "Alerts for new listings matching your wishlist",
              default: false,
            },
            {
              label: locale === "de" ? "Community-Erwähnungen" : "Community Mentions",
              desc: locale === "de"
                ? "Wenn jemand dich in einem Beitrag erwähnt"
                : "When someone mentions you in a post",
              default: true,
            },
            {
              label: "Newsletter",
              desc: locale === "de"
                ? "Wöchentliche Marktberichte und Sammlertipps"
                : "Weekly market reports and collecting tips",
              default: true,
            },
          ].map((notification) => (
            <div key={notification.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{notification.label}</p>
                <p className="text-xs text-white/40">{notification.desc}</p>
              </div>
              <button
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  notification.default
                    ? "bg-[var(--color-primary)]"
                    : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    notification.default ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="mt-6">
        <CardContent className="p-0">
          {[
            {
              icon: CreditCard,
              label: locale === "de" ? "Zahlungsmethoden" : "Payment Methods",
              desc: locale === "de" ? "Stripe Connect verwalten" : "Manage Stripe Connect",
            },
            {
              icon: Package,
              label: locale === "de" ? "Versandadressen" : "Shipping Addresses",
              desc: locale === "de" ? "Adressen fur Bestellungen" : "Addresses for orders",
            },
            {
              icon: Shield,
              label: locale === "de" ? "Sicherheit" : "Security",
              desc: locale === "de" ? "Passwort und 2FA" : "Password and 2FA",
            },
            {
              icon: Mail,
              label: locale === "de" ? "E-Mail" : "Email",
              desc: "elvizekaj02@gmail.com",
            },
          ].map(({ icon: Icon, label, desc }, i) => (
            <div key={label}>
              <button className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-white/[0.02]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                  <Icon className="h-5 w-5 text-white/60" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-white/40">{desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/20" />
              </button>
              {i < 3 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <div className="mt-8 flex items-center justify-between rounded-xl border border-red-500/10 bg-red-500/5 p-6">
        <div>
          <p className="text-sm font-medium text-red-400">
            {locale === "de" ? "Abmelden" : "Sign Out"}
          </p>
          <p className="text-xs text-white/40">
            {locale === "de"
              ? "Du wirst von deinem Konto abgemeldet."
              : "You will be signed out of your account."}
          </p>
        </div>
        <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
          <LogOut className="mr-2 h-4 w-4" />
          {locale === "de" ? "Abmelden" : "Sign Out"}
        </Button>
      </div>
    </div>
  );
}

import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SettingsContent />;
}

function SettingsContent() {
  const t = useTranslations("common");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl">{t("settings")}</h1>
      <div className="mt-8 space-y-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl">{t("profile")}</h2>
          <p className="mt-2 font-sans text-sm text-muted-foreground">
            Manage your profile, preferences, and account settings.
          </p>
        </div>
      </div>
    </div>
  );
}

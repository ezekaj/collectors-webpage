import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CommunityContent />;
}

function CommunityContent() {
  const t = useTranslations("nav");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl">{t("community")}</h1>
      <p className="mt-4 font-sans text-muted-foreground">
        Connect with fellow collectors, share your finds, and find what you&apos;re looking for.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/community"
          className="rounded-md bg-primary px-4 py-2 font-sans text-sm font-semibold text-primary-foreground"
        >
          Feed
        </Link>
        <Link
          href="/community"
          className="rounded-md border border-border px-4 py-2 font-sans text-sm text-muted-foreground hover:text-foreground"
        >
          {t("wanted")}
        </Link>
        <Link
          href="/community"
          className="rounded-md border border-border px-4 py-2 font-sans text-sm text-muted-foreground hover:text-foreground"
        >
          {t("showcases")}
        </Link>
        <Link
          href="/community"
          className="rounded-md border border-border px-4 py-2 font-sans text-sm text-muted-foreground hover:text-foreground"
        >
          {t("events")}
        </Link>
      </div>

      <div className="mt-12 rounded-lg border border-dashed border-border bg-card/50 p-12 text-center">
        <p className="font-sans text-muted-foreground">
          Community features coming soon. Share your collection, find wanted items, and join events.
        </p>
      </div>
    </div>
  );
}

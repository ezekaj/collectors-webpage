import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function GradePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GradeContent />;
}

function GradeContent() {
  const t = useTranslations("grading");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl">{t("title")}</h1>
      <p className="mt-4 font-sans text-muted-foreground">
        {t("placeSurface")}
      </p>

      <div className="mt-12 flex flex-col items-center">
        {/* Camera Preview Area */}
        <div className="aspect-square w-full max-w-lg overflow-hidden rounded-2xl border-2 border-border bg-card">
          <div className="flex h-full flex-col items-center justify-center p-8">
            <div className="rounded-full bg-secondary p-6">
              <svg
                className="h-12 w-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                />
              </svg>
            </div>
            <p className="mt-4 font-sans text-sm text-muted-foreground">
              Camera access required
            </p>
          </div>
        </div>

        <button className="mt-8 rounded-full bg-primary px-8 py-3 font-sans text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          {t("startGrading")}
        </button>

        {/* Grading Steps */}
        <div className="mt-12 grid w-full max-w-lg grid-cols-5 gap-2">
          {["captureTop", "captureLeft", "captureBottom", "captureCardFront", "captureCardBack"].map(
            (step, i) => (
              <div
                key={step}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-mono text-xs">
                  {i + 1}
                </div>
                <p className="text-center font-sans text-[10px] text-muted-foreground">
                  {t(step as any)}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

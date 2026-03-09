import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/sections/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n";

const BASE_URL = "https://physiotherapie-corpusomnia.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.agb" });

  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    alternateLanguages[loc] = `${BASE_URL}/${loc}/agb`;
  }

  return {
    title: t("pageTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/agb`,
      languages: alternateLanguages,
    },
  };
}

export default async function AGBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("legal.agb");

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Breadcrumb locale={locale} currentPage={t("heading")} currentPath="agb" />
        <div className="container mx-auto px-4 pb-24 max-w-4xl">
          <Card>
            <CardHeader>
              <h1 className="text-3xl leading-none font-semibold">{t("heading")}</h1>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                {t("intro")}
              </p>
              
              <h2>{t("scope.title")}</h2>
              <p>{t("scope.text")}</p>

              <h2>{t("appointments.title")}</h2>
              <p>{t("appointments.text")}</p>

              <h2>{t("cancellation.title")}</h2>
              <p>{t("cancellation.text")}</p>

              <h2>{t("payment.title")}</h2>
              <p>{t("payment.text")}</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

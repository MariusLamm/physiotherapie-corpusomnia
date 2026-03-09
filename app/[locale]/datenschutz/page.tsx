import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/sections/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n";

const BASE_URL = "https://physiotherapie-corpusomnia.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.datenschutz" });

  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    alternateLanguages[loc] = `${BASE_URL}/${loc}/datenschutz`;
  }

  return {
    title: t("pageTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/datenschutz`,
      languages: alternateLanguages,
    },
  };
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("legal.datenschutz");

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Breadcrumb locale={locale} currentPage={t("heading")} currentPath="datenschutz" />
        <div className="container mx-auto px-4 pb-24 max-w-4xl">
          <Card>
            <CardHeader>
              <h1 className="text-3xl leading-none font-semibold">{t("heading")}</h1>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                {t("intro")}
              </p>

              <h2>{t("responsible.title")}</h2>
              <p className="whitespace-pre-line">{t("responsible.text")}</p>

              <h2>{t("collection.title")}</h2>
              <p>{t("collection.text")}</p>

              <h2>{t("sharing.title")}</h2>
              <p>{t("sharing.text")}</p>

              <h2>{t("contactForm.title")}</h2>
              <p>{t("contactForm.text")}</p>

              <h2>{t("maps.title")}</h2>
              <p>{t("maps.text")}</p>

              <h2>{t("rights.title")}</h2>
              <p>{t("rights.text")}</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

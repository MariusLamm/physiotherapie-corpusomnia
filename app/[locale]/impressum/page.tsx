import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/sections/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n";

const BASE_URL = "https://physiotherapie-corpusomnia.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.impressum" });

  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    alternateLanguages[loc] = `${BASE_URL}/${loc}/impressum`;
  }

  return {
    title: t("pageTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/impressum`,
      languages: alternateLanguages,
    },
  };
}

export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("legal.impressum");

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Breadcrumb locale={locale} currentPage={t("heading")} currentPath="impressum" />
        <div className="container mx-auto px-4 pb-24 max-w-4xl">
          <Card>
            <CardHeader>
              <h1 className="text-3xl leading-none font-semibold">{t("heading")}</h1>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h2>{t("legalInfo")}</h2>
              
              <h3>{t("practice")}</h3>
              <p className="whitespace-pre-line">{t("practiceAddress")}</p>

              <h3>{t("contactTitle")}</h3>
              <p className="whitespace-pre-line">{t("contactInfo")}</p>

              <h3>{t("representative")}</h3>
              <p className="whitespace-pre-line">{t("representativeInfo")}</p>

              <h3>{t("jobTitle")}</h3>
              <p>{t("jobTitleInfo")}</p>

              <h3>{t("authority")}</h3>
              <p>{t("authorityInfo")}</p>

              <h3>{t("disclaimer")}</h3>
              <p>{t("disclaimerText1")}</p>
              <p>{t("disclaimerText2")}</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

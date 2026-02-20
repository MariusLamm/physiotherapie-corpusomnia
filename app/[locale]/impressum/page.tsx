import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/sections/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.impressum" });
  return {
    title: t("pageTitle"),
    description: t("metaDesc"),
  };
}

export default async function ImpressumPage() {
  const t = await getTranslations("legal.impressum");

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{t("heading")}</CardTitle>
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

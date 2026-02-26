import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/sections/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.datenschutz" });
  return {
    title: t("pageTitle"),
    description: t("metaDesc"),
  };
}

export default async function DatenschutzPage() {
  const t = await getTranslations("legal.datenschutz");

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

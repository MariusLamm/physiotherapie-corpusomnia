import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/sections/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.agb" });
  return {
    title: t("pageTitle"),
    description: t("metaDesc"),
  };
}

export default async function AGBPage() {
  const t = await getTranslations("legal.agb");

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

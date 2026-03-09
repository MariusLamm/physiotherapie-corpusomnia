import { Navbar } from "@/components/navigation/navbar";
import { MobileCTA } from "@/components/navigation/mobile-cta";
import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { Expertise } from "@/components/sections/expertise";
import { Location } from "@/components/sections/location";
import { Contact } from "@/components/sections/contact";
import { Team } from "@/components/sections/team";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { StructuredData } from "@/components/structured-data";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n";

const BASE_URL = "https://physiotherapie-corpusomnia.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    alternateLanguages[loc] = `${BASE_URL}/${loc}`;
  }

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: `${BASE_URL}/${locale}`,
      siteName: t("siteName"),
      locale: locale === "de" ? "de_CH" : locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t("siteName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: [`${BASE_URL}/og-image.jpg`],
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <StructuredData locale={locale} />
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-0">
        <Hero />
        <Benefits />
        <Contact />
        <Expertise />
        <Location />
        <Team />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}

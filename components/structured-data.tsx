import { getTranslations } from "next-intl/server";

const BASE_URL = "https://physiotherapie-corpusomnia.ch";

interface StructuredDataProps {
  locale: string;
}

export async function StructuredData({ locale }: StructuredDataProps) {
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "PhysicalTherapy",
    "@id": `${BASE_URL}/#business`,
    name: "Physiotherapie Corpus Omnia",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.jpg`,
    description:
      "Evidenzbasierte Physiotherapie in Dietlikon (Zürich) mit Fokus auf individuelle Betreuung und neueste wissenschaftliche Standards.",
    telephone: "+41766817031",
    email: "info@physiotherapie-corpusomnia.ch",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industriestrasse 24",
      addressLocality: "Dietlikon",
      postalCode: "8305",
      addressRegion: "Zürich",
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.4189,
      longitude: 8.6195,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "00:00",
      closes: "23:59",
      description: "By appointment only / Termine nach Vereinbarung",
    },
    priceRange: "$$",
    currenciesAccepted: "CHF",
    paymentAccepted: "Cash, Insurance",
    areaServed: [
      { "@type": "City", name: "Dietlikon" },
      { "@type": "City", name: "Wallisellen" },
      { "@type": "City", name: "Dübendorf" },
      { "@type": "City", name: "Kloten" },
      { "@type": "City", name: "Bassersdorf" },
      { "@type": "AdministrativeArea", name: "Zürich" },
    ],
    availableLanguage: [
      { "@type": "Language", name: "German", alternateName: "de" },
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Turkish", alternateName: "tr" },
    ],
    medicalSpecialty: [
      "Orthopedic",
      "Neurological",
      "Geriatric",
      "Sports Medicine",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Physiotherapy Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Allgemeine Physiotherapie" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Orthopädie" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Neurologie" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Lymphologie" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Sportphysiotherapie" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Geriatrie" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Domizilbehandlungen" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Massage" } },
      ],
    },
    sameAs: [
      "https://www.instagram.com/physiotherapiecorpusomnia/",
    ],
    founder: {
      "@type": "Person",
      "@id": `${BASE_URL}/#founder`,
      name: "Goncagül Erol",
      jobTitle: "Dipl. Physiotherapeutin FH",
      knowsLanguage: ["German", "English", "Turkish"],
      affiliation: {
        "@type": "Organization",
        name: "Physiotherapie Corpus Omnia",
      },
    },
  };

  const faqQuestions = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqQuestions.map((key) => ({
      "@type": "Question",
      name: tFaq(`${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaq(`${key}.answer`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

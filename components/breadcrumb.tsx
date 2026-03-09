import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://physiotherapie-corpusomnia.ch";

interface BreadcrumbProps {
  locale: string;
  currentPage: string;
  currentPath: string;
}

export async function Breadcrumb({ locale, currentPage, currentPath }: BreadcrumbProps) {
  const t = await getTranslations({ locale, namespace: "breadcrumb" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("home"),
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: currentPage,
        item: `${BASE_URL}/${locale}/${currentPath}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-24 pb-4 max-w-4xl">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link
              href={`/${locale}`}
              className="hover:text-primary transition-colors"
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <span className="text-foreground font-medium" aria-current="page">
              {currentPage}
            </span>
          </li>
        </ol>
      </nav>
    </>
  );
}

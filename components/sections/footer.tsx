"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Physiotherapie Corpus Omnia"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-bold">Physiotherapie Corpus Omnia</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t("quickLinks")}</h4>
            <nav className="flex flex-col space-y-1 text-sm">
              <Link href={`/${locale}#kontakt`} className="text-muted-foreground hover:text-primary transition-colors py-1.5 md:py-0.5">
                {tNav("contact")}
              </Link>
              <Link href={`/${locale}#expertise`} className="text-muted-foreground hover:text-primary transition-colors py-1.5 md:py-0.5">
                {tNav("expertise")}
              </Link>
              <Link href={`/${locale}#standort`} className="text-muted-foreground hover:text-primary transition-colors py-1.5 md:py-0.5">
                {tNav("location")}
              </Link>
              <Link href={`/${locale}#team`} className="text-muted-foreground hover:text-primary transition-colors py-1.5 md:py-0.5">
                {tNav("team")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t("contact")}</h4>
            <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
              <a href="tel:+41766817031" className="hover:text-primary transition-colors py-1.5 md:py-0.5">
                Tel: +41 76 681 70 31
              </a>
              <a
                href="mailto:info@physiotherapie-corpusomnia.ch"
                className="hover:text-primary transition-colors break-all py-1.5 md:py-0.5"
              >
                info@physiotherapie-corpusomnia.ch
              </a>
              <p className="pt-2">
                Industriestrasse 24<br />
                8305 Dietlikon
              </p>
            </div>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t("followUs")}</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/physiotherapiecorpusomnia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Physiotherapie Corpus Omnia. {t("rights")}</p>
          <nav className="flex gap-6">
            <Link href={`/${locale}/agb`} className="hover:text-primary transition-colors py-1.5 md:py-0">
              {t("agb")}
            </Link>
            <Link href={`/${locale}/datenschutz`} className="hover:text-primary transition-colors py-1.5 md:py-0">
              {t("privacy")}
            </Link>
            <Link href={`/${locale}/impressum`} className="hover:text-primary transition-colors py-1.5 md:py-0">
              {t("imprint")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

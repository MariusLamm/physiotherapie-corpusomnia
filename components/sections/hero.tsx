"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/backgrounds/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/75 dark:bg-background/80" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-32 h-32 md:w-40 md:h-40"
          >
            <Image
              src="/logo.png"
              alt="Physiotherapie Corpus Omnia Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              {t("title")}
              <br />
              <span className="text-primary">{t("titleHighlight")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              asChild
              className="text-base"
            >
              <a
                href="https://web.cenplexbooking.ch/appointment-selection?customerId=258&locationId=426"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("bookAppointment")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#kontakt")}
            >
              {t("contactUs")}
            </Button>
          </motion.div>

          {/* Insurance logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-8 flex flex-col items-center justify-center gap-4"
          >
            <div className="text-sm text-muted-foreground">
              {t("insuranceText")}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="relative h-12 w-28 md:grayscale md:hover:grayscale-0 transition-all md:opacity-70 md:hover:opacity-100">
                <Image
                  src="/insurance/insurance-1.png"
                  alt="Krankenkasse Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-12 w-28 md:grayscale md:hover:grayscale-0 transition-all md:opacity-70 md:hover:opacity-100">
                <Image
                  src="/insurance/insurance-2.png"
                  alt="Krankenkasse Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
